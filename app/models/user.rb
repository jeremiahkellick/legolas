class User < ApplicationRecord
  validates :first_name, :last_name, presence: true

  devise :database_authenticatable, :registerable, :recoverable, :rememberable,
         :validatable, :confirmable

  monetize :balance_cents
end
