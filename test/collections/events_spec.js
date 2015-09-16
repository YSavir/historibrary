describe('collections/events', function(){

  var buildCollection = function(opts){
    opts = opts || {};
    var coll = new App.Collections.Event();
    if (opts.models) {
      for (var i = 0; i < opts.models; i++){
        coll.add({id: i});
      }
    }
    if (opts.resourceCollection){
      coll.resourceCollection = opts.resourceCollection;
    }

    return coll;
  };
  
  describe('.model', function(){
    it('should return the Event model', function(){
      var collection = new App.Collections.Event();

      expect(collection.model).to.equal(App.Models.Event);
    });
  });

  describe('.url', function(){
    it('should be the url to the events API', function(){
      var collection = new App.Collections.Event();

      expect(collection.url).to.equal('/api/v1/events')
    });
  });

  describe('.setResourcesForEvent', function(){
    it('should fetch the resources for the event', function(){
      var collection = buildCollection({
            models: 1,
            resourceCollection: Doubles.Collections.Resource()
          }),
          event = collection.models[0],
          returnArray = [1, 2],
          callback = function(){
            event.attributes.resources = returnArray;
          },
          fetchStub = sandbox.stub(collection.resourceCollection, 'fetchForEvent', callback); 

      collection.setResourcesForEvent(event);

      expect(event.get('resources')).to.eql(returnArray);
    });
  });

  describe('.respondToNewResource', function(){
    it('should set an event listener for \'submitResource\' on the passed object and respond with addNewResource', function(){
      var coll = new App.Collections.Event(),
          spy = sandbox.spy(coll, 'addNewResource'),
          triggerArgs = {model: 'model', data: {}},
          // create a skeleton collection to act as a resource collection
          triggerObject = new ( Backbone.Collection.extend() );

      coll.respondToNewResource(triggerObject);
      triggerObject.trigger('submitResource', triggerArgs);

      expect(spy).to.have.been.calledWith(triggerArgs);
    });
  });
});
