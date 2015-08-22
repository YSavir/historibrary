describe('templates/resources', function(){
  afterEach(function(){
    sandbox.restore();
  });

  describe('summary', function(){
    it('should render a summary of the resource', function(){
      var resource = Doubles.Models.Resource({name: 'A Resource'}),
          targetHTML = "<h5>A Resource</h5>\n";

      expect(HandlebarsTemplates['resources/summary'](resource)).to.equal(targetHTML);
    });
  });
});

