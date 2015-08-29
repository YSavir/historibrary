require 'rails_helper'

RSpec.describe 'Users sign up', :type => :feature do
  context 'When not signed in' do
    scenario 'I should see a link to sign up' do
      visit '/'

      expect(page).to have_content 'Sign Up'
    end

    context 'A I sign up' do
      scenario 'I should be signed in with the new account' do
        visit '/'
        click_link "Sign Up"
        signup_form = page.find '.new_user'
        signup_form.fill_in 'user[email]', :with => "example@email.com"
        signup_form.fill_in 'user[password]', :with => "password123"
        signup_form.fill_in 'user[password_confirmation]', :with => "password123"
        signup_form.fill_in 'user[username]', :with => "Test User"
        signup_form.click_button "Sign up"

        expect(page).to have_content "Welcome, Test User"
      end
    end
  end
end
