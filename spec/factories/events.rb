FactoryGirl.define do
  factory :event do
    sequence(:name) { |n| "Event #{n}" }
    start_date '1/1/1620'
    end_date '1/1/1620'
    summary 'This event\'s summary'
  end
end
