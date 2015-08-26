require 'rails_helper'

RSpec.describe 'User Logging In' do
  context 'As a user visiting the site' do
    scenario 'I should be able to log in' do
      user = create :user

      visit '/events'
      fill_in 'user[email]', :with => user.email
      fill_in 'user[password]', :with => user.password
      click_button 'Sign in'

      expect(page).to have_content "Welcome, #{user.username}"
    end
  end
end
