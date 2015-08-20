var HandlebarsTemplates = {
      // Set up initial functions, since Sinon does not let you stub
      // properties that don't yet exist....
      'events/summary': function(){},
      'events/list': function(){},
      'events/details': function(){}
    },
    TemplateStrings = {};

(function(){

  // TEMPLATE STRINGS
  TemplateStrings.eventSummary = "<h3>Sample Event</h3>\n<p>1/1/1640</p>";

  TemplateStrings.eventList = "<h2>Events</h2><ul class=\"events-list\"></ul>";

  TemplateStrings.eventDetails = "<h3>Sample Event</h3>\n<p>1/1/1640</p>\n<p>This Event Has Happend</p>"
  
  // TEMPLATE STUBS
  Stubs.Templates.EventSummary = function(){
    return sandbox.stub(HandlebarsTemplates, 'events/summary');
  }

  Stubs.Templates.EventsList = function(){
    return sandbox.stub(HandlebarsTemplates, 'events/list');
  };

  Stubs.Templates.EventDetails = function(){
    return sandbox.stub(HandlebarsTemplates, 'events/details');
  };

})();
