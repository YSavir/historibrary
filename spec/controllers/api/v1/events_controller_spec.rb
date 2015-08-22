require 'rails_helper'

def as_response(model)
  model_keys = model.attributes.keys
  keys_to_keep = model_keys.reject! { |k| k =~ /created_at|updated_at/ }
  return model.as_json :only => keys_to_keep
end

RSpec.describe Api::V1::EventsController, type: :controller do
  describe '#index' do
    render_views
    describe 'With 3 events' do
      it 'should return the events as json' do
        events = create_list :event, 3
        events_data = events.map do |event|
          event_data = as_response(event)
          event_data['resources'] = event.resources
          event_data
        end

        get :index, :format => :json
        content = response.body

        expect(content).to eq(events_data.to_json)
      end
    end

    describe 'With an event with three resources' do
      it 'should return the event with its resources' do
        # Create event without `created_at` and `updated_at`
        # add its resources (also without the above values)
        event = create :event_with_resources
        event_data = as_response(event)
        event_data['resources'] = event.resources.map { |rsrc| as_response(rsrc) }
        event_as_json = [event_data].to_json

        get :index, :format => :json
        content = response.body

        expect(content).to eq(event_as_json)
      end
    end
  end
end
