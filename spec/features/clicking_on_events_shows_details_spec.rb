require 'rails_helper'

RSpec.feature "User clicks on an event in events index", type: :feature, :js => true do
  scenario "should show event summary" do
    event = create :event,
              :summary => "This event happened",
              :name => "Some Event"

    visit '/events'
    page.find('li', :text => 'Some Event').click
    
    expect(page).to have_content(event.summary)
  end

  context 'and another event is already  expanded to show details' do
    it 'should collapse the other event', :js => true do
      events = create_list :event, 2

      visit '/events'
      page.find('li:nth-of-type(1)').click
      page.find('li:nth-of-type(2)').click

      expect(page).to have_css :li, :text => "This event\'s summary",
                                    :count => 1
    end
  end
end
