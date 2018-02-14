require 'rails_helper'

describe RecordsController do
  describe "POST #create" do
    context "valid attributes" do
      it "saves the new record in the database" do
        expect{
          post :create, params: attributes_for(:record)
        }.to change(Record, :count).by(1)
      end
    end
    context "with invalid attributes" do
      it "does not save new record in the database" do
        expect{
          post :create, params: attributes_for(:record, :invalid_record)
        }.to change(Record, :count).by(0)
      end
    end
  end

  describe 'PATCH #update' do
    let!(:record){ create(:record) }
    context "valid attributes" do
      it "changes @record's attributes" do
        patch :update,
        params: { id: record }.merge(attributes_for(:record, result: 'bad'))
        record.reload
        expect(record.result).to eq('bad')
      end
    end
    context "with invalid attributes" do
      it "does not change the record's attributes" do
        patch :update,
        params: { id: record }.merge(attributes_for(:record, :invalid_record))
        record.reload
        expect(record.result).to eq('good')
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:record){ create(:record) }
    it "deletes the record" do
      expect{
        delete :destroy, params: { id: record }
      }.to change(Record,:count).by(-1)
    end
  end
end