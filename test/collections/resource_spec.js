describe('collections/resource', function(){

  afterEach(function(){
    sandbox.restore();
  });

  describe('.model', function(){
    it('should be the Resource model', function(){
      var collection = new App.Collections.Resource();

      expect(collection.model).to.eql(App.Models.Resource);
    });
  });

  describe('.fetchForEvent', function(){
    it('should fetch the resources for a given event', function(){
      var event = Doubles.Models.Event({id: 1}),
          coll = new App.Collections.Resource(),
          ajaxStub = sandbox.stub($, 'ajax'),
          ajaxValues = {
            context: coll,
            url: '/events/1/resources',
            method: 'GET',
            datatype: 'JSON',
            success: coll.addResources,
            error: coll._logError
          },
          resources = [
            Doubles.Models.Resource({id: 1}).attributes,
            Doubles.Models.Resource({id: 2}).attributes,
            Doubles.Models.Resource({id: 3}).attributes
          ];


     ajaxStub.withArgs(ajaxValues).yieldsToOn('success', coll, resources);
     coll.fetchForEvent(event);

     expect(coll.models).to.have.lengthOf(3);
    }); 
  });
});

