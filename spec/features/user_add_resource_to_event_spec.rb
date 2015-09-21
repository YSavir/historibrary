require 'rails_helper'

RSpec.describe 'As a user that is viewing an event\'s details', :type => :feature, :js => true do
  context 'and is logged in' do
    context 'and submits a resource' do
      scenario 'I should see that resource added to the event\'s resource list' do
      user = create :user
      resource_details = {name: "New Resource", summary: "new", source_url: 'url'}
      create :event_with_resources
      visit '/'
      log_in_as user

      event_li = page.find('.content.events ul li')
      event_li.click
      event_li.click_button("Add a Resource")
      form = page.find('.new-resource-form')
      form.fill_in 'resource[name]', :with => resource_details[:name]
      form.fill_in 'resource[summary]', :with => resource_details[:summary]
      form.fill_in 'resource[source_url]', :with => resource_details[:source_url]
      form.click_button 'Submit'

      expect(event_li.find('li:last-of-type')).to have_text resource_details[:name]
      end
    end

  end
  
  context 'and that is not logged in' do
    scenario 'I should not see a form to submit a new resource' do
      user = create :user
      create :event_with_resources
      visit '/'

      event_li = page.find('.content.events ul li')
      event_li.click

      expect(event_li).to have_no_content("Add a Resource")
    end
  end
end
