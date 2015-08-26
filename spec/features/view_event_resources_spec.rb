require 'rails_helper'

RSpec.describe 'Viewing Event Resources', :type => :feature, :js => true do
  context 'When viewing an event with 3 resources' do
    scenario 'I should see 3 a list of 3 resources in its details' do
      create :event_with_resources

      visit '/events'
      event_li = page.find('.events.content li')
      event_li.click

      expect(event_li.find_all('li')).to have(3).list_elements
    end

    scenario 'I should see each resource\'s name' do
      create :event_with_resources

      visit '/events'
      event_li = page.find('.events.content li')
      event_li.click

      expect(event_li).to have_content 'Some Resource', :count => 3
    end

    scenario 'I should see each resource\'s summary' do
      create :event_with_resources
       
      visit '/events'
      event_li = page.find('.events.content li')
      event_li.click

      expect(event_li).to have_content 'Resource Summary', :count => 3
    end

    context 'And all the resources have links to sources' do
      scenario 'I should see each of those links' do
        create :event_with_resources

        visit '/events'
        event_li = page.find('.events.content li')
        event_li.click

        expect(event_li).to have_link 'Source', :href => 'Source URL', :count => 3
      end
    end

    context 'And only two resources have links to sources' do
      scenario 'I should see only two links' do
        event = create :event_with_resources
        event.resources.last.update_attribute(:source_url, '')

        visit '/events'
        event_li = page.find('.events.content li')
        event_li.click
        
        expect(event_li).to have_link 'Source', :href => 'Source URL', :count => 2
      end
    end
  end
end

