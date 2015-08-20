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
  }
});
