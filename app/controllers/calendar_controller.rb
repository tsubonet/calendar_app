class CalendarController < ApplicationController

  def index
    render_for_react(
      props: {
        name: "index"
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
