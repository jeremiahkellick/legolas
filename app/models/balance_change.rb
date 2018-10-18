class BalanceChange < ApplicationRecord
  validates :amount_cents, :time, presence: true

  belongs_to :user

  after_initialize :ensure_time

  private

  def ensure_time
    self.time ||= Time.now
  end
end
