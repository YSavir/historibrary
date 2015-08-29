class EventsController < ApplicationController

  def index
    @dashboard = {}

    if user_signed_in?
      @dashboard[:user] = current_user
      @dashboard[:session_templates] = ['welcome_user']
    else
      @dashboard[:user] = User.new
      @dashboard[:session_templates] = ['login_form', 'signup']
    end
  end

end
