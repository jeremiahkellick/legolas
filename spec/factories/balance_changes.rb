FactoryBot.define do
  factory :balance_change do
    user { nil }
    amount_cents { 1 }
    time { "2018-10-17 15:56:59" }
  end
end
