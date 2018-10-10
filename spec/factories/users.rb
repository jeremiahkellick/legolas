FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name  { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { "starwarsiv" }
  end

  factory :jeremiah, class: User do
    first_name { "Jreremiah" }
    last_name { "Kellick" }
    email { "jeremiah@jeremiahkellick.com" }
    password { "starwarsiv" }
  end
end
