describe('templates/events', function(){

  afterEach(function(){
    sandbox.restore();
  });

  describe('list', function(){
    it('should render the HTML for an events list', function(){
      var targetHTML = "<h2>Events</h2>\n"
                     + "<hr class=\"bar\">\n"
                     + "<ul></ul>\n";

      expect(HandlebarsTemplates['events/list']()).to.equal(targetHTML);
    });
  });

  describe('summary', function(){
    it('should render the HTML for an event summary', function(){
      var event = Doubles.Models.Event(),
          targetHTML = "<h3>Sample Event</h3>\n"
                     + "<p>1/1/1640</p>\n";

      expect(HandlebarsTemplates['events/summary'](event)).to.equal(targetHTML);
    });
  });

  describe('details', function(){
    describe('for an event with no resources', function(){
      it('should render the HTML for an event with details', function(){
        var event = Doubles.Models.Event(),
            targetHTML = "<h3>Sample Event</h3>\n"
                       + "<p>1/1/1640</p>\n"
                       + "<p>This event has happened</p>\n"
                       + "<button class=\"add-resource\">Add a Resource</button>\n";

        expect(HandlebarsTemplates['events/details'](event)).to.equal(targetHTML);
      });
    });

    describe("for an event with 3 resources", function(){
      it('should render the HTML for the event and its resources', function(){
        var event = Doubles.Models.Event().withResources(3),
            resourceSummaryStub = sandbox.stub(Handlebars.partials, 'resourceSummary'),
            targetHTML = "<h3>Sample Event</h3>\n"
                       + "<p>1/1/1640</p>\n"
                       + "<p>This event has happened</p>\n"
                       + "<h4>Event Resources</h4>\n"
                       + "<ul>\n"
                       + "<li>Some Resource</li>\n"
                       + "<li>Some Resource</li>\n"
                       + "<li>Some Resource</li>\n"
                       + "</ul>\n"
                       + "<button class=\"add-resource\">Add a Resource</button>\n";
        resourceSummaryStub.returns('Some Resource');

        expect(HandlebarsTemplates['events/details'](event)).to.equal(targetHTML);
      });
    });
  });
});
