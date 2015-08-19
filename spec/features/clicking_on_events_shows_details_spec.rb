require 'rails_helper'

RSpec.feature "User clicks on an event in events index", type: :feature, :js => true do
  it "should show event summary" do
    event = create :event,
              :summary => "This event happened",
              :name => "Some Event"

    visit '/events'
    page.find('li', :text => 'Some Event').click
    
    expect(page).to have_content(event.summary)
  end
end
