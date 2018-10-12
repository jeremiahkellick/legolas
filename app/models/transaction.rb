class Transaction < ApplicationRecord
  validates :symbol, :shares, :time, presence: true
  validate :symbol_must_be_known,
    :user_must_have_enough_buying_power,
    :user_must_have_enough_shares

  belongs_to :user

  after_initialize :ensure_time
  after_create_commit :remove_from_user_balance

  def symbol=(value)
    super(value.upcase)
  end

  private

  def symbol_must_be_known
    return if user.nil?
    ensure_price
    unless @price.is_a?(Money)
      errors[:base] << @price
    end
  end

  def ensure_time
    self.time ||= Time.now
  end

  def ensure_price
    @price ||= Stock.price(symbol)
  end

  def remove_from_user_balance
    ensure_price
    user.balance -= @price * shares
    user.save!
  end

  def user_must_have_enough_buying_power
    return if user.nil? || shares < 0
    ensure_price
    unless user.balance > @price * shares
      errors[:base] << "You don't have enough buying power"
    end
  end

  def user_must_have_enough_shares
    return if user.nil? || shares > 0
    ensure_price
    unless user.shares_of(symbol) >= shares.abs
      errors[:base] << "You don't have that many shares"
    end
  end
end
