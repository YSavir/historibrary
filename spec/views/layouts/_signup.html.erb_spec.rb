require 'rails_helper'

RSpec.describe 'layouts/_signup', :type => :view do
  it "should render a link to the sign up page" do
    render

    expect(rendered).to have_link 'Sign Up', :href => '/users/sign_up'
  end
end
