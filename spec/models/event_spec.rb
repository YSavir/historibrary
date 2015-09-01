require 'rails_helper'

RSpec. describe Event do

  # Presence Tests
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :start_date }
  it { is_expected.to validate_presence_of :end_date }
  it { is_expected.to validate_presence_of :summary }

  # Qualifying Tests
  it { is_expected.to validate_length_of(:summary)
                                         .is_at_most(500)
                                         .on(:create) }

  describe 'When creating an event with an end_date' do
    describe 'that is earlier than the start_date' do
      it 'should not be valid' do
        invalid_event = Event.create(:name => 'Invalid event',
                                     :summary => 'Bad date ranges',
                                     :start_date => '1/2/2015',
                                     :end_date => '1/1/2015')

        end_date_errors = invalid_event.errors.messages[:end_date]
        expect(end_date_errors).to include 'end_date cannot be before start_date'
      end
    end

    describe 'that is the same as the start_date' do
      it 'should be valid' do
        event = Event.create(:name => 'Invalid event',
                             :summary => 'Bad date ranges',
                             :start_date => '1/2/2015',
                             :end_date => '1/2/2015')

        expect(event).to be_valid
      end
    end

    describe 'that is later than the start_date' do
      it 'should be valid' do
        event = Event.create(:name => 'Invalid event',
                             :summary => 'Bad date ranges',
                             :start_date => '1/2/2015',
                             :end_date => '1/3/2015')
        
        expect(event).to be_valid
      end
    end
  end
end
