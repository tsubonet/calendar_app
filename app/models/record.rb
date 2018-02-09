class Record < ApplicationRecord
  validates :done_on, presence: true, uniqueness: true
  validates :result, presence: true
end
