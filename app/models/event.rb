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

end
