describe('collections/events', function(){
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

  describe('.addNewResource', function(){});

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
