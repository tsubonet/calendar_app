require 'rails_helper'

describe Record do
  it "is valid with a done_on, result" do
    record = build(:record)
    expect(record).to be_valid
  end

  it "is invalid without a done_on" do
    record = build(:record, done_on: nil)
    record.valid?
    expect(record.errors[:done_on]).to include("can't be blank")
  end

  it "is invalid without a result" do
    record = build(:record, result: nil)
    record.valid?
    expect(record.errors[:result]).to include("can't be blank")
  end

  it "is invalid with a duplicate done_on" do
    create(:record)
    record = build(:record)
    record.valid?
    expect(record.errors[:done_on]).to include("has already been taken")
  end
end