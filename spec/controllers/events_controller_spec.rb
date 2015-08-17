require 'rails_helper'

RSpec.describe EventsController, type: :controller do
  describe 'get INDEX' do
    it 'should render the events/index template' do
      get :index

      expect(response).to render_template :index
    end
  end
end
