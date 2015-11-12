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

  it 'should render the session div' do
    stub_user_signed_in_as_false
    assign :dashboard, Dashboard.new

    render

    expect(rendered).to have_selector '.session-login'
  end
end
