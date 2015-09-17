require 'rails_helper'

RSpec.describe 'When viewing the events index,', :js => true do
  context 'with a single event' do
    it 'should show a list of events with names and years' do
      event = create :event, :name => 'Sample Event',
                             :start_date => '1/1/2015',
                             :end_date => '1/1/2015'
       
      visit '/events'

      expect(page).to have_text 'Sample Event'
      expect(page).to have_text '1/1/2015'
    end
  end
end
