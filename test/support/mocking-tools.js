(function(){

  // Mock Event Models
  var mockEvent = function(){
    this.attributes = {
      name: 'Sample Event',
      starting_date: '1/1/1640'
    };
  };

  mocks.models.event = function(opts){
    opts = opts || {};
    var mockModel = new mockEvent();

    for(prop in opts) {
      mockModel.attributes[prop] = opts[prop];
    };

    return mockModel;
  };

  // Mock Event Collections

  var mockEventCollection = function(){
    this.models = [];
  }

  mocks.collections.event = function(opts){
    opts = opts || {};
    var mockCollection = new mockEventCollection(),
        i = 0,
        totalModels = opts.models || 0;

    for(; i < totalModels; i++){
      mockCollection.models.push(mocks.models.event());
    }

    return mockCollection;
  };
})()

