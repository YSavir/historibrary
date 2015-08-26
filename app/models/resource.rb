class Resource < ActiveRecord::Base
   
  # Relations
  has_many :event_resources
  has_many :events, :through => :event_resources

  # Validations
  validates :name,
    :presence => true
  validates :summary,
    :presence => true,
    :length => { :maximum => 500 }
end
