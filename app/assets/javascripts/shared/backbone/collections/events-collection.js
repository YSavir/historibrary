App.Collections.Event = Backbone.Collection.extend({

  model: App.Models.Event,
  url: '/api/v1/events',

  initialize: function(){
    this.fetch();
  },

  addNewResource: function(){},

  setResourcesForEvent: function(event){
    this.resourceCollection.fetchForEvent(event);
  },

  orderByStartDate: function(){
    return this.sortBy(function(event){
      return event.get('start_date');
    });
  }
});
