App.Collections.Resource = Backbone.Collection.extend({

  model: App.Models.Resource,
  _eventResources: {},

  fetchForEvent: function(event){
    $.ajax({
      context: this,
      method: "GET",
      contentType: "JSON",
      url: "/api/v1/resources?event_id=" + event.get('id'),
      success: function(){
        return function(responseData){
          this.addResourcesFromResponse(responseData, event);
        }
      }(),
      error: this._logError
    });
  },

  createResourceForEvent: function(event, resourceData){
    $.ajax({
      url: '/api/v1/resources',
      method: 'POST',
      dataType: 'JSON',
      data: {
        event_id: event.get('id'),
        resource: resourceData
      },
      success: function(data){
        this._addResource(event, data);
      }.bind(this)
    });
  },

  addResourcesFromResponse: function(resources, event){
    resources.forEach(function(resource){
      this._addResource(event, resource);
    }.bind(this));

    event.attributes.resources = this.resourcesForEvent(event);
  },

  resourcesForEvent: function(event){
    return this._eventResources[event.get('id')];
  },

  _logError: function(err){
    console.log(err);
  },

  _addResource: function(event, resource){
    resource = this.add(resource);
    this._addResourceForEvent(event, resource);
  },

  _addResourceForEvent: function(event, resource){
    // add resource to eventResources for that event
    // set that event's resources to an array if it isn't already created
    // TODO: Create a JS object to act as a join table lookup to replace this
    // method of tracking relations
    var eventId = event.get('id'),
        eventResources = this._eventResources[eventId];

    if (!eventResources) {
      eventResources = this._eventResources[eventId] = [];
    }
    
    if (eventResources.indexOf(resource) < 0 ){
      event.addResource(resource);
      eventResources.push(resource);
    }
  }
});
