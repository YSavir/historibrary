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

  validate :end_date_does_not_precede_start_date

  has_many :event_resources
  has_many :resources, :through => :event_resources

  private

  def end_date_does_not_precede_start_date
    return false unless start_date && end_date
    # Parse dates from string format
    # Dates saved as string to avoid "year 0" and negative year problems
    # Ruby uses "year 0" despite it not being used in either gregorian or
    # julian calendars.
    # See:
    # http://stackoverflow.com/questions/31077771/activerecord-adding-to-negative-date-year
    # May be solvable by using ISO8601?
    date_format = "%m/%d/%Y"
    st_date, en_date = [start_date, end_date].map do |date|
      Date.strptime(date, date_format)
    end
    if en_date < st_date
      errors.add :end_date,  "end_date cannot be before start_date"
    end
  end

end

