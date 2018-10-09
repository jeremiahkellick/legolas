require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { FactoryBot.build(:user) }

  it 'uses devise' do
    expect(user.devise_modules).to contain_exactly(
      :database_authenticatable,
      :rememberable,
      :recoverable,
      :registerable,
      :validatable,
      :confirmable
    )
  end

  it { should validate_presence_of(:first_name) }
  it { should validate_presence_of(:last_name) }

  describe '#balance' do
    it 'returns a money object' do
      expect(user.balance).to be_a(Money)
    end

    it 'is based on balance_cents' do
      user.balance_cents = 50
      expect(user.balance.cents).to eq(50)
    end
  end
end
