ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'spork'
require 'capybara/rspec'

Spork.prefork do
  RSpec.configure do |config|
    config.expect_with :rspec do |expectations|
      expectations.syntax = :expect
      expectations.include_chain_clauses_in_custom_matcher_descriptions = true
    end

    config.mock_with :rspec do |mocks|
      mocks.verify_partial_doubles = true
    end

    config.include FactoryGirl::Syntax::Methods
  end
end

Spork.each_run do

end

