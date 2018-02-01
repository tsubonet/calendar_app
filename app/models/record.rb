class Record < ApplicationRecord
  validates :done_on, presence: true
  validates :result, presence: true
end
