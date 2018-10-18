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
    unless @price_cents.is_a?(Numeric)
      errors[:base] << "Unknown symbol"
    end
  end

  def ensure_time
    self.time ||= Time.now
  end

  def ensure_price
    @price_cents ||= Stock.price_cents(symbol)
  end

  def remove_from_user_balance
    ensure_price
    user.balance_changes.create!(
      amount_cents: -@price_cents * shares,
      time: time
    )
  end

  def user_must_have_enough_buying_power
    return if user.nil? || shares < 0
    ensure_price
    unless user.balance_cents > @price_cents * shares
      errors[:base] << "Not Enough Buying Power"
    end
  end

  def user_must_have_enough_shares
    return if user.nil? || shares > 0
    ensure_price
    unless user.shares_of(symbol) >= shares.abs
      errors[:base] << "Not Enough Shares"
    end
  end
end
