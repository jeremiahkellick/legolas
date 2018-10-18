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

  after_initialize :ensure_session_token

  has_many :transactions
  has_many :watches
  has_many :balance_changes

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

  def watched_stocks
    watches.map(&:symbol)
  end

  def balance_cents(at_time: Time.now)
    balance_changes.where("time <= ?", at_time).sum(:amount_cents) +
      1_000_000 * 100
  end

  def shares_of(symbol, at_time: Time.now)
    transactions
      .where(symbol: symbol.upcase)
      .where("time <= ?", at_time)
      .sum(:shares)
  end

  def shares_hash(at_time: Time.now)
    @shares_hash ||= transactions.where("time <= ?", at_time)
                                 .group(:symbol)
                                 .having("SUM(shares) > 0")
                                 .pluck(:symbol, Arel.sql("SUM(shares)"))
                                 .to_h
  end

  def all_previously_owned_stock_symbols
    @all_previously_owned_stock_symbols ||=
      transactions.group(:symbol).pluck(:symbol)
  end

  def day_charts
    charts = all_previously_owned_stock_symbols.map do |symbol|
      Stock.day_chart(
        symbol,
        key_by_time: true,
        clear_zeroes: false
      )
    end
    combine_charts(charts)
  end

  def five_years_charts
    charts = all_previously_owned_stock_symbols.map do |symbol|
      Stock.five_years_charts(
        symbol,
        key_by_time: true,
        clear_zeroes: false
      )
    end
    combine_charts(charts)
  end

  def combine_charts(stock_charts_hashes)
    @times_to_remove = []
    charts = { stocks: {}, user_charts: {} }
    stock_charts_hashes.each do |stock_charts_hash|
      symbol = stock_charts_hash[:symbol]
      user_charts = stock_charts_hash.deep_dup
      user_charts.delete(:symbol)
      clear_zeroes(stock_charts_hash)
      charts[:stocks][symbol] = charts_hashes_to_arrays(stock_charts_hash)
      apply_multiplier_to_charts(symbol, user_charts)
      charts[:user_charts].deep_merge!(user_charts) do |key, a, b|
        key == :price_cents ? a + b : b
      end
    end
    clear_times_to_remove(charts[:user_charts])
    charts_hashes_to_arrays(charts[:user_charts])
    add_balance_to_charts(charts[:user_charts])
    charts
  end

  private

  def add_balance_to_charts(charts)
    charts[:price_cents] += balance_cents if charts[:price_cents]
    charts.each do |type, chart|
      next unless chart.is_a?(Hash)
      chart[:points].each do |point|
        point[:price_cents] += balance_cents(
          at_time: Time.at(point[:time] / 1000)
        )
      end
    end
  end

  def charts_hashes_to_arrays(charts)
    charts.each do |key, value|
      if value.is_a?(Hash)
        value[:points] = value[:points].keys.sort.map { |k| value[:points][k] }
      end
    end
  end

  def clear_zeroes(charts)
    charts.each do |key, value|
      if value.is_a?(Hash)
        value[:points].each do |time, point|
          value[:points].delete(time) if point[:price_cents] == 0
        end
      end
    end
  end

  def clear_times_to_remove(charts)
    charts.each do |key, value|
      if value.is_a?(Hash)
        @times_to_remove.each { |time| value[:points].delete(time) }
      end
    end
  end

  def apply_multiplier_to_charts(symbol, charts)
    if charts[:price_cents]
      charts[:price_cents] *= shares_hash[symbol] || 0
    end
    charts.each do |key, value|
      if value.is_a?(Hash)
        value[:points].each do |time_num, point|
          time = Time.at(time_num / 1000)
          shares = shares_of(symbol, at_time: time)
          point[:price_cents] *= shares
          if point[:price_cents] == 0
            value[:points].delete(time_num)
            @times_to_remove << time_num if shares > 0
          end
        end
      end
    end
  end
end
