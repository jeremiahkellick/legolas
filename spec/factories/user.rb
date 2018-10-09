FactoryBot.define do
  factory :user do
    email { "bob@example.com" }
    first_name { "Bob" }
    last_name { "TheBuilder" }
    password { "starwars" }
  end
end
