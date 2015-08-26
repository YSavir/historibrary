require 'rails_helper'

RSpec.describe Resource do

  # Presence Tests
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :summary }

  # Qualifier Tests
  it { is_expected.to validate_length_of(:summary)
                                        .is_at_most(500)
                                        .on(:create) }
end
