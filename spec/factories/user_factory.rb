FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "testuser#{n}@email.com" }
    password "password123"
    username "Test User"
  end
end
