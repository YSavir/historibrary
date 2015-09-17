ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'spork'
require 'capybara/rspec'
require 'capybara/poltergeist'

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {
    extensions: ['vendor/poltergeist/bind.js']
  })
end

Capybara.javascript_driver = :poltergeist

Spork.prefork do
  RSpec.configure do |config|
    config.expect_with :rspec do |expectations|
      expectations.syntax = :expect
      expectations.include_chain_clauses_in_custom_matcher_descriptions = true
    end

    config.mock_with :rspec do |mocks|
      mocks.verify_partial_doubles = true
    end

    # Helper methods, etc.
    Dir["#{Rails.root}/spec/support/**/*.rb"].each { |f| require f }
    config.include SpecHelpers::EventViewHelpers
    config.include SpecHelpers::AuthenticationHelpers
    config.include FactoryGirl::Syntax::Methods
  end
end

Spork.each_run do

end

