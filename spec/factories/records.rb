FactoryBot.define do
  factory :record do
    done_on '2018-02-02'
    result 'good'
    trait :invalid_record do
      result nil
    end
  end
end