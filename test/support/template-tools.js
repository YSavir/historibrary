var HandlebarsTemplates = {
      // Set up initial functions, since Sinon does not let you stub
      // properties that don't yet exist....
      'events/summary': function(){},
      'events/list': function(){}
    },
    templateStrings = {};

(function(){

  // TEMPLATE STRINGS
  templateStrings.eventSummary = "<h3>Sample Event</h3>\n<p>1/1/1640</p>";

  templateStrings.eventList = "<h2>Events</h2><ul class=\"events-list\"></ul>";
  
  // TEMPLATE STUBS
  stubs.templates.eventSummary = function(){
    return sandbox.stub(HandlebarsTemplates, 'events/summary');
  }

  stubs.templates.eventsList = function(){
    return sandbox.stub(HandlebarsTemplates, 'events/list');
  };

})();
