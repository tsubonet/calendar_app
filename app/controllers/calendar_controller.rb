class CalendarController < ApplicationController

  def month

    begin
      Time.local(params[:year], params[:month])
      year, month = params[:year].to_i, params[:month].to_i
    rescue StandardError
      year, month = Time.new.year, Time.new.month
    end

    render_for_react(
      props: {
        year: year,
        month: month,
        records: Record.where(done_on: Time.new(year, month, 1).all_month),
      },
    )
  end

  def day

    begin
      Time.local(params[:year], params[:month], params[:day])
      year, month, day = params[:year].to_i, params[:month].to_i, params[:day].to_i
    rescue StandardError
      year, month, day = Time.new.year, Time.new.month, Time.new.day
    end

    render_for_react(
      props: {
        year: year,
        month: month,
        day: day,
        record: Record.find_by(done_on: "#{year}-#{month}-#{day}"),
      },
    )
  end

end
