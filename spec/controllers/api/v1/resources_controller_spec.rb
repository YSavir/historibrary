require 'rails_helper'

resource_attrs = {
  'name' => "Some resource",
  'summary' => "A resource",
  'source_url' => "http://some-site.wtv"
}

RSpec.describe Api::V1::ResourcesController, :type => :controller do
  describe 'POST #create' do
    describe 'When passed resource data in params' do
      describe 'And no user is logged in' do
        it 'should return an authentication error' do
          event = create :event
          stub_current_user user: nil

          post :create, :format => :json,
                        :event_id => event.id,
                        :resource => resource_attrs

          response_data = JSON.parse(response.body)
          expect(response_data).to include({'status' => 403})
        end
      end

      describe 'And the user is logged in' do
        render_views

        it 'should create that resource' do
          stub_current_user
          event = create :event

          expect {
            post :create, :format => :json,
                          :event_id => event.id,
                          :resource => resource_attrs

          }.to change(Resource, :count)
        end

        it 'should assign that resource to the event' do
          stub_current_user
          event = create :event

          expect {
            post :create, :format => :json,
                          :event_id => event.id,
                          :resource => resource_attrs

          }.to change(event.resources, :count)
        end

        it 'should mark that event as created by the current user' do
          user = create :user
          stub_current_user user: user
          event = create :event

          expect {
            post :create, :format => :json,
                          :event_id => event.id,
                          :resource => resource_attrs

          }.to change(user.created_resources, :count)
        end

        it 'should return the resource as JSON' do
          stub_current_user
          event = create :event

          post :create, :format => :json,
                        :event_id => event.id,
                        :resource => resource_attrs

          response_data = JSON.parse(response.body)
          expect(response_data).to include resource_attrs
        end
      end
    end
  end
end
