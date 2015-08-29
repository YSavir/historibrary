require 'rails_helper'

RSpec.describe EventsController, type: :controller do
  describe 'get INDEX' do
    it 'should render the events/index template' do
      stub_current_user

      get :index

      expect(response).to render_template :index
    end

    describe 'With no user signed in' do
      it 'should assign user as an empty user object' do
        allow(controller).to receive(:user_signed_in?).and_return(false)
        stub_current_user

        get :index

        expect(assigns(:dashboard)[:user].attributes).to eq(User.new.attributes)
      end

      it 'should assign the login session template' do
        allow(controller).to receive(:user_signed_in?).and_return(false)
        stub_current_user

        get :index

        expect(assigns(:dashboard)[:session_templates]).to include 'login_form'
      end

      it 'should assign the signup session template' do
        allow(controller).to receive(:user_signed_in?).and_return(false)
        stub_current_user

        get :index

        expect(assigns[:dashboard][:session_templates]).to include 'signup'
      end
    end

    describe "With a signed-in user" do
      it "should assign user to that user instance" do
        user = create :user
        stub_current_user user: user

        get :index

        expect(assigns(:dashboard)[:user]).to be(user)
      end

      it 'should assign the welcome session template' do
        user = create :user
        stub_current_user user: user

        get :index

        expect(assigns[:dashboard][:session_templates]).to include 'welcome_user'
      end
    end
  end
end
