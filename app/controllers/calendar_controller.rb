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
      },
    )
  end

  def detail
    render_for_react(
      props: {
        name: "detail"
      },
    )
  end

end
