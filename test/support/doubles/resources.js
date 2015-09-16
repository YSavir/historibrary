(function(){
  // Model Double Source
  
  var ModelDouble = Backbone.Model.extend({
    defaults: {
      name: "Sample Resource",
      summary: "Resource Summary",
      source_url: "I'm a URL"
    }
  });

  Doubles.Models.Resource = function(opts){
    var opts = opts || {};
    var modelDouble = new ModelDouble();

    for(var prop in opts) {
      modelDouble.attributes[prop] = opts[prop];
    };

    return modelDouble;
  };

  var CollectionDouble = Backbone.Collection.extend({
    fetchForEvent: function(){}
  });

  Doubles.Collections.Resource = function(){
    return new CollectionDouble();
  };
})();
