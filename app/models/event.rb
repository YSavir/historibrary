class Event < ActiveRecord::Base
  validates :name,
    :presence => true

  validates :start_date,
    :presence => true

  validates :end_date,
    :presence => true

  validates :summary,
    :presence => true,
    :length => { :maximum => 500 }

  has_many :event_resources
  has_many :resources, :through => :event_resources
end

