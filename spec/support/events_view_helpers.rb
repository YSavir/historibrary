module SpecHelpers
  module EventViewHelpers

    def event_li
      @event_li ||= page.find('.events.content li')
    end

    def visit_events_and_click_first_li
      visit '/events'
      event_li.click
    end
  end
end


