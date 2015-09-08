(function(){

  // Event Model Doubles

  var EventDouble = Backbone.Model.extend({

    dateRange: function(){ return '1/1/1640'; },

    defaults: {
      name: 'Sample Event',
      starting_date: '1/1/1640',
      ending_date: '1/1/1640',
      summary: 'This event has happened'
    }
  });

   EventDouble.prototype.withResources = function(totalResources){
    this.attributes.resources = [];

    for (var i = 0; i < totalResources; i++){
      this.attributes.resources.push({});
    };

    return this;
  };

  Doubles.Models.Event = function(opts){
    opts = opts || {};
    var modelDouble = new EventDouble();

    for(var prop in opts) {
      modelDouble.attributes[prop] = opts[prop];
    };

    return modelDouble;
  };

  // Event Collection Doubles

  var EventCollectionDouble = function(){
    this.models = [];
  }

  Doubles.Collections.Event = function(opts){
    opts = opts || {};
    var collectionDouble = new EventCollectionDouble(),
        i = 0,
        totalModels = opts.models || 0;

    for(; i < totalModels; i++){
      collectionDouble.models.push(Doubles.Models.Event());
    }

    return collectionDouble;
  };

  // Event View Doubles

  var EventViewDouble = Backbone.View.extend({});

  Doubles.Views.Event = function(){
    var model = new EventDouble();

    return new EventViewDouble({model: model});
  };
  
})()

