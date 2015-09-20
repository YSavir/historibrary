class Users::RegistrationsController < Devise::RegistrationsController

  before_action :set_dashboard 
  before_filter :configure_permitted_parameters, :only => [:create]
  respond_to :json

  private

  def set_dashboard
    @dashboard = Dashboard.new
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password) }
  end

end
