require 'rails_helper'

RSpec.describe 'Users sign up', :type => :feature do
  context 'When not signed in' do
    scenario 'I should see a link to sign up' do
      visit '/'

      expect(page).to have_content 'Sign Up'
    end

    context 'A I sign up' do
      it 'I should be signed in with new account' do
        visit '/'
        click_link "Sign Up"
        fill_in 'user[email]', :with => "example@email.com"
        fill_in 'user[password]', :with => "password123"
        fill_in 'user[password_confirmatin]', :with => "password123"
        fill_in 'user[username]', :with => "Test User"
        click_button "Sign Up"

        expect(page).to have_content "Welcome, Test User"
      end
    end
  end
end
