(function(){
  // Model Double Source
  
  var ModelDouble = Backbone.Model.extend({
    defaults: {
      name: "Sample Session",
      summary: "Session Summary",
      source_url: "I'm a URL"
    },

    addUserWithCredentials: function(){}
  });

  Doubles.Models.Session = function(opts){
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

  Doubles.Collections.Session = function(){
    return new CollectionDouble();
  };
})();
