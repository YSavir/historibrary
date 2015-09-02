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

  describe('new', function(){
    it('should renter the HTML for a new resource form', function(){
      var targetHTML = "<form class=\"new-resource-form\">\n"
                     + "<label for=\"new-resource-name\">Name:</label>\n"
                     + "<input type=\"text\" name=\"resource[name]\">\n"
                     + "<label for=\"new-resource-summary\">Summary:</label>\n"
                     + "<input type=\"text\" name=\"resource[summary]\">\n"
                     + "<label for=\"new-resource-source-url\">Source URL:</label>\n"
                     + "<input type=\"text\" name=\"resource[source_url]\">\n"
                     + "</form>\n";

      expect(HandlebarsTemplates['resources/new']()).to.equal(targetHTML);
    });
  });
});

