describe('templates/resources', function(){
  afterEach(function(){
    sandbox.restore();
  });

  describe('summary', function(){
    describe('when the resource has a source URL', function(){
      it('should render a summary of the resource with a source anchor tag', function(){
        var resource = Doubles.Models.Resource({
              name: 'A Resource',
              summary: 'Resource Summary',
              source_url: 'Source URL'
            }),
            targetHTML = "<h5>A Resource</h5>\n"
                       + "<p>Resource Summary</p>\n"
                       + "<a href=\"Source URL\">Source</a>\n";

        expect(HandlebarsTemplates['resources/summary'](resource)).to.equal(targetHTML);
      });
    });

    describe('When the resource does not have a source URL', function(){
      it('should render a summary of the resource without a source anchor tag', function(){
        var resource = Doubles.Models.Resource({
              name: 'A Resource',
              summary: 'Resource Summary'
            }),
            targetHTML = "<h5>A Resource</h5>\n"
                       + "<p>Resource Summary</p>\n";

        expect(HandlebarsTemplates['resources/summary'](resource)).to.equal(targetHTML);
      });
    });
  });
});

