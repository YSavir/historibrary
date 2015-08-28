require 'rails_helper'

RSpec.describe 'layouts/_welcome_user', :type => :view do
  it 'should render a welcome with the username' do
    stub_user_signed_in as: true
    assign :dashboard, {user: create(:user)}

    render

    expect(rendered).to have_content "Welcome, Test User"
  end

  it 'should have a link to log out' do
    stub_user_signed_in as: true
    assign :dashboard, {user: create(:user)}

    render

    expect(rendered).to have_link 'Logout', href: '/users/sign_out'
  end
end

