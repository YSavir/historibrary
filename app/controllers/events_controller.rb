class EventsController < ApplicationController

  def index
    session_template = user_signed_in? ? "welcome_user" : "login_form"
    user = current_user || User.new

    @dashboard = {
      user: user,
      session_template: session_template
    }
  end

end
