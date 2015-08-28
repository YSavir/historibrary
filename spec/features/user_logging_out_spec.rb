require 'rails_helper'

RSpec.describe "Users logging out", :type => :feature do

  context "As a user that is logged in" do
    scenario "I should be able to click a button to log out" do
      user = create :user

      log_in_as(user)
      click_link "Logout"

      expect(page).to have_css 'input[name="user[email]"]'
    end
  end

  context "As a user that is not logged in" do
    scenario "I should not see a log out button" do
      visit '/'

      expect(page).not_to have_content 'Logout'
    end
  end
end
