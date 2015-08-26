require 'rails_helper'

RSpec.describe User do
  # Does not test native Devise features unless intentionally modified

  # Presence Tests
  it { is_expected.to validate_presence_of :username }

  # Qualifications Tests
  it { is_expected.to validate_length_of(:username)
                                         .is_at_most(16)
                                         .is_at_least(3) }
end
