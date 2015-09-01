App.Models.Event = Backbone.Model.extend({
  dateRange: function(){
    return this._isSingleDate()
      ? this.get('start_date')
      : this._joinedDates();
  },

  _isSingleDate: function(){
    var attrs = this.attributes;
    if (attrs.start_date === attrs.end_date) { return true; }
    return false;
  },

  _joinedDates: function(){
    var attrs = this.attributes;
    return attrs.start_date + ' - ' + attrs.end_date;
  },

  validate: function(attrs){
    var parsedStartDate = Date.parse(attrs.start_date),
        parsedEndDate = Date.parse(attrs.end_date);

    if (parsedEndDate < parsedStartDate) {
      return "Event end date cannot be before start date";
    }
  }
});
