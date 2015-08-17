# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'spec_helper'
require 'rspec/rails'
require 'capybara/rails'
ActiveRecord::Migration.maintain_test_schema!

# Force all database connections to use same thread
# This fixes problems with some web drivers not accessing the database properly
# taken from https://gist.github.com/josevalim/470808

class ActiveRecord::Base
  mattr_accessor :shared_connection
  @@shared_connection = nil

  def self.connection
    @@shared_connection || retrieve_connection
  end
end

ActiveRecord::Base.shared_connection = ActiveRecord::Base.connection

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = true

  # Load support files
  Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

  config.infer_spec_type_from_file_location!
end
