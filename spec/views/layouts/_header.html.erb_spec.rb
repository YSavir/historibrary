require 'rails_helper'
RSpec.describe 'layouts/_header', :type => :view do
  it 'should render the page title' do
    stub_user_signed_in_as_false
    assign :dashboard, Dashboard.new

    render

    expect(rendered).to have_css :h1, :text => 'Historibrary'
  end

  it 'should render the subtitle' do
    stub_user_signed_in_as_false
    assign :dashboard, Dashboard.new

    render

    expect(rendered).to have_css :p, :text => 'A collection of historical events and related resourcesFiction and Nonfiction'
  end

  context 'and no user is logged in' do
    it 'should render the login form' do
      stub_user_signed_in_as_false
      assign :dashboard, Dashboard.new

      render

      expect(view).to render_template(:partial => '_login_form')
    end

    it 'should render the sign up link' do
      stub_user_signed_in_as_false
      assign :dashboard, Dashboard.new

      render

      expect(view).to render_template(:partial => '_signup')
    end
  end

  context 'and a user is logged in' do
    it 'should not render the login form' do
      stub_user_signed_in as: true
      assign :dashboard, Dashboard.new(create(:user))

      render

      expect(view).not_to render_template(:partial => '_login_form')
    end

    it 'should render the welcome_user template' do
      stub_user_signed_in as: true
      assign :dashboard, Dashboard.new(create(:user))
     
      render

      expect(view).to render_template(:partial => '_welcome_user') 
    end
  end

end
