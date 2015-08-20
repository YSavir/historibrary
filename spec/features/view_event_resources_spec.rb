require 'rails_helper'

RSpec.describe 'Viewing Event Resources', :type => :feature, :js => true do
  context 'When viewing an event with 3 resources' do
    scenario 'I should see 3 a list of 3 resources in its details' do
      create :event_with_resources

      visit '/events'
      event_li = page.find('.events.content li')
      event_li.click

      expect(event_li.find_all('li.resource-summary')).to have(3).list_elements
    end
  end
end

