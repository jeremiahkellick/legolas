class Watch < ApplicationRecord
  validates :symbol, uniqueness: { scope: :user_id }
  validate :symbol_must_be_known

  belongs_to :user

  def symbol=(value)
    super(value.upcase)
  end

  private

  def symbol_must_be_known
    errors[:base] << "Unknown symbol" if Stock.price_cents(symbol).nil?
  end
end
