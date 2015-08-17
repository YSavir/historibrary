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
});
