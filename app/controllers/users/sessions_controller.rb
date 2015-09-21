class Users::SessionsController < Devise::SessionsController
  respond_to :json


  def current
    render :json => { :user => current_user }
  end
end
