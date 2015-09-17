require 'rails_helper'

RSpec.describe 'A logged-in user adding a resource to an event', :type => :feature, :js => true do
  scenario 'should see that resource added to the event\'s resource list' do
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
