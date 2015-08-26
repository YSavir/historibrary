require 'rails_helper'

RSpec.describe 'layouts/_login_form', :type => :view do
  it 'should render the login form' do
    assign :user, User.new
    form_text = <<-expected
<form accept-charset="UTF-8" action="/users/sign_in" method="post"><div style="display:none"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <input id="user_email" name="user[email]" type="text" value="" />
  <input id="user_password" name="user[password]" type="password" />
  <input name="user[remember_me]" type="hidden" value="0" /><input id="user_remember_me" name="user[remember_me]" type="checkbox" value="1" />
  <label for="user_remember_me">Remember me</label>
  <input name="commit" type="submit" value="Sign in" />
  <a href="/users/password/new">Forgot your password?</a>
</form>
expected

    render

    expect(rendered).to match form_text
  end 
end
