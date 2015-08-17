App.Collections.Event = Backbone.Collection.extend({
  model: App.Models.Event,
  url: '/api/v1/events'
});
