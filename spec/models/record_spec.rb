require 'rails_helper'

describe Record do
  it "is valid with a done_on, result" do
    record = Record.new(
      done_on: '2018-02-02',
      result: 'good',
    )
    expect(record).to be_valid
  end

  it "is invalid without a done_on" do
    record = Record.new(done_on: nil)
    record.valid?
    expect(record.errors[:done_on]).to include("can't be blank")
  end

  it "is invalid without a result" do
    record = Record.new(result: nil)
    record.valid?
    expect(record.errors[:result]).to include("can't be blank")
  end

  it "is invalid with a duplicate done_on" do
    Record.create(
      done_on: '2018-02-02',
      result: 'good',
    )
    record = Record.new(
      done_on: '2018-02-02',
      result: 'good',
    )
    record.valid?
    expect(record.errors[:done_on]).to include("has already been taken")
  end
end