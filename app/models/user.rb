class User < ApplicationRecord
  attr_reader :password

  validates(
    :first_name,
    :last_name,
    :email,
    :password_digest,
    :session_token,
    presence: true
  )
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 10, allow_nil: true }

  monetize :balance_cents

  after_initialize :ensure_session_token

  has_many :transactions

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token
    self.session_token = SecureRandom.urlsafe_base64
    save!
    session_token
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def shares_of(symbol, at_time: Time.now)
    transactions
      .where(symbol: symbol.upcase)
      .where("time <= ?", at_time)
      .sum(:shares)
  end

  def shares_hash(at_time: Time.now)
    transactions
      .where("time <= ?", at_time)
      .group(:symbol)
      .having("SUM(shares) > 0")
      .pluck(:symbol, Arel.sql("SUM(shares)"))
      .to_h
  end

  def charts
    stock_charts = []
    user_charts = {}
    shares_hash.each do |symbol, shares|
      charts = Stock.charts(symbol, key_by_time: true) do |time|
        shares_of(symbol, at_time: time)
      end
      user_charts.deep_merge!(charts) do |key, a, b|
        key == :price_cents ? a + b : b
      end
    end
    user_charts.each do |key, value|
      if value.is_a?(Hash)
        value[:points] = value[:points].values
      end
    end
    user_charts
  end
end
