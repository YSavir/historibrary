require 'rails_helper'

RSpec. describe Event do

  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :start_date }
  it { is_expected.to validate_presence_of :summary }
  it { is_expected.to validate_length_of(:summary)
                                           .is_at_most(500)
                                           .on(:create) }
end
