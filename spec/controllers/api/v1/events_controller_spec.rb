require 'rails_helper'

RSpec.describe Api::V1::EventsController, type: :controller do
  describe '#index' do
    it 'should return JSON' do
      get :index

      response_is_json = !!JSON.parse(response.body)

      expect(response_is_json).to be true
    end
  end
end
