(function(){
  // Model Double Source
  
  var ResourceDouble = function(){
    this.attributes = {
      name: "Sample Resource",
      summary: "Resource Summary",
      source_url: "I'm a URL"
    };
  };

  Doubles.Models.Resource = function(opts){
    var opts = opts || {};
    var modelDouble = new ResourceDouble();

    for(var prop in opts) {
      modelDouble.attributes[prop] = opts[prop];
    };

    return modelDouble;
  };
})();
