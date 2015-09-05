App.Collections.Resource = Backbone.Collection.extend({

  model: App.Models.Resource,

  fetchForEvent: function(event){
    $.ajax({
      context: this,
      method: "GET",
      datatype: "JSON",
      url: "/events/" + event.attributes.id + "/resources",
      success: this.addResources,
      error: this._logError
    });
  },

  addResources: function(data){
    data.forEach(function(resource){
      this.add(resource);
    }.bind(this));

  },

  _logError: function(err){
    console.log(err);
  }
});
