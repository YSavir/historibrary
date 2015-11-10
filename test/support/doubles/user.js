(function(){
  
  var ModelDouble = Backbone.Model.extend({
    defaults: {
      username: "they",
      email: "example@email.com",
      password: "password123"
    },
  });

  Doubles.Models.User = function(opts){
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

  Doubles.Collections.User = function(){
    return new CollectionDouble();
  };
})();
