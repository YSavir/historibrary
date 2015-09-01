class Resource < ActiveRecord::Base
   
  # Relations
  has_many :event_resources
  has_many :events, :through => :event_resources

  belongs_to :creator, class_name: "User", foreign_key: "creator_id"

  # Validations
  validates :name,
    :presence => true
  validates :summary,
    :presence => true,
    :length => { :maximum => 500 }
end
