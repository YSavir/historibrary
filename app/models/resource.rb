class Resource < ActiveRecord::Base
  has_many :event_resources
  has_many :events, :through => :event_resources
end
