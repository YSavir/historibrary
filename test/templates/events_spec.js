describe('templates/events', function(){
  describe('list', function(){
    it('should render the HTML for an events list', function(){
      var targetHTML = "<h2>Events</h2>\n"
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
    it('should render the HTML for an event with details', function(){
      var event = Doubles.Models.Event(),
          targetHTML = "<h3>Sample Event</h3>\n"
                     + "<p>1/1/1640</p>\n"
                     + "<p>This event has happened</p>\n";

      expect(HandlebarsTemplates['events/details'](event)).to.equal(targetHTML);
    });
  });
});
