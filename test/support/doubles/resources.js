(function(){
  // Model Double Source
  
  var ResourceDouble = function(){
  };

  Doubles.Models.Resource = function(opts){
    var opts = opts || {};
    var modelDouble = new ResourceDouble();

    for(var prop in opts) {
      modelDouble[prop] = opts[prop];
    };

    return modelDouble;
  };
})();
