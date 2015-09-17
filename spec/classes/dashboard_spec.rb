require 'rails_helper'

RSpec.describe Dashboard do

  describe 'initialize' do
    describe 'when not passed a user' do
      it 'should create a blank user' do
        dashboard = Dashboard.new

        expect(dashboard.user.attributes).to eq(User.new.attributes)
      end
    end
  end

  describe '#user' do
    it 'should return the dashboard user' do
      user = build :user
      dashboard = Dashboard.new user

      expect(dashboard.user).to be(user)
    end
  end

  describe '#session_templates' do
    it 'should return an array' do
      dashboard = Dashboard.new

      expect(dashboard.session_templates).to be_an Array
    end

    describe 'with an unsaved user' do
      it 'should contain the visitor templates' do
        dashboard = Dashboard.new
        visitor_templates = ['login_form', 'signup']

        expect(dashboard.session_templates).to contain_exactly *visitor_templates
      end
    end

    describe 'with a saved user' do
      it 'should contain the logged-in user templates' do
        dashboard = Dashboard.new create(:user)
        user_templates = ['welcome_user']
        
        expect(dashboard.session_templates).to contain_exactly *user_templates
      end
    end
  end
end
