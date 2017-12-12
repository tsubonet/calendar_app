class CalendarController < ApplicationController

  def index
    render_for_react(
      props: {
        name: "index"
      },
    )
  end

  def show
    render_for_react(
      props: {
        name: "show"
      },
    )
  end
end
