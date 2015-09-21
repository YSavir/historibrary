App.Models.Event = Backbone.Model.extend({

  defaults: {
    resources: []
  },

  constructor: function(){
    Backbone.Model.apply(this, arguments);

    var resourcesAsModels = this.get('resources').map(function(resource){
      return new App.Models.Resource(resource);
    });

    if (this.get('start_date') && this.get('end_date')){
      this.set('start_date', this._getCorrectDate( this.get('start_date') ));
      this.set('end_date', this._getCorrectDate(this.get('end_date') ));
    }

    this.set('resources', resourcesAsModels);
  },

  dateRange: function(){
    return this._isSingleDate()
      ? this.get('start_date').toLocaleDateString()
      : this._joinedDates();
  },

  addResource: function(resource){
    this.get('resources').push(resource);
    this.trigger('change');
  },

  stringifiedStartDate: function(){
    return this._stringifyDate(this.get('start_date'));
  },

  stringifiedEndDate: function(){
    return this._stringifyDate(this.get('end_date'));
  },

  // new Date() with string cannot parse BC dates
  // this function does it manually
  _getCorrectDate: function(dateString){
    var dateAttrs = dateString.split('/');
    return new Date(dateAttrs[2], dateAttrs[0], dateAttrs[1]);
  },

  _stringifyDate: function(date){
    return date.toLocaleDateString();
  },

  _isSingleDate: function(){
    return this.stringifiedStartDate() === this.stringifiedEndDate();
  },

  _joinedDates: function(){
    return this.stringifiedStartDate() + ' - ' + this.stringifiedEndDate();
  },

  validate: function(attrs){
    var parsedStartDate = Date.parse(attrs.start_date),
        parsedEndDate = Date.parse(attrs.end_date);

    if (parsedEndDate < parsedStartDate) {
      return "Event end date cannot be before start date";
    }
  }
});
