require 'rails_helper'

RSpec.describe 'api/v1/events', :type => :feature do
  context 'When making a call to GET /events' do
    scenario 'should receive all events as json' do
      events = create_list :event, 3

      visit 'api/v1/events'
      content = page.body

      expect(content).to eq(events.to_json)
    end
  end
end
