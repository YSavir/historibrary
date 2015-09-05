describe('models/resource', function(){
  describe('.get(\"attribute\")', function(){
    it('should return the attribute\'s value', function(){
      var resource = new App.Models.Resource({name: 'Sample Resource'});

      expect(resource.get('name')).to.equal('Sample Resource');
    });
  });
});
