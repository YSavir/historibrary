class Dashboard
  attr_reader :user, :session_templates

  def initialize(user=User.new)
    @user = user || User.new
    set_templates_for_user
  end

  private

  def set_templates_for_user
    @session_templates = @user.persisted? ? user_templates : visitor_templates
  end

  def user_templates
    ['welcome_user']
  end

  def visitor_templates
    ['login_form', 'signup']
  end

end
