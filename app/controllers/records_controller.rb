class RecordsController < ApplicationController

  # POST /records
  # POST /records.json
  def create
    record = Record.new(record_params)
    if record.save
      response_data = {
        record: record,
        status: 'success',
        txt: ['投稿しました！'],
      }
    else
      response_data = {
        status: 'error',
        txt: record.errors.full_messages,
      }
    end
    render json: response_data
  end

  # PATCH /records/1
  # PATCH /records/1.json
  def update
    record = Record.find(params[:id])
    if record.update(record_params)
      response_data = {
        record: record,
        status: 'success',
        txt: ['投稿しました！'],
      }
    else
      response_data = {
        status: 'error',
        txt: record.errors.full_messages,
      }
    end
    render json: response_data
  end

  private
    def record_params
      params.permit(:done_on, :result)
    end
end
