FactoryBot.define do
  factory :transaction do
    user { nil }
    symbol { "MyString" }
    shares { 1 }
    time { "2018-10-11 09:48:55" }
  end
end
