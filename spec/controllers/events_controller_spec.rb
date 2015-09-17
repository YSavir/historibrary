require 'rails_helper'

RSpec.describe EventsController, type: :controller do
  describe 'get INDEX' do
    it 'should render the events/index template' do
      stub_current_user

      get :index

      expect(response).to render_template :index
    end

    it 'should assign the dashboard' do
      stub_current_user
      
      get :index

      expect(assigns(:dashboard)).to be_a Dashboard
    end

    describe 'With a logged in user' do
      it 'should assign the current user to the dashboard' do
        user = create :user
        stub_current_user user: user

        get :index

        expect(assigns(:dashboard).user).to be user
      end
    end
  end
end
