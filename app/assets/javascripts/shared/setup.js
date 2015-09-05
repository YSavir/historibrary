var App = {
  Models: {},
  Collections: {},
  Views: {},
  CollectionViews: {},
  Routers: {}
};

(function(){
  Handlebars.registerPartial('resourceSummary', HandlebarsTemplates['resources/summary']);
  Handlebars.registerPartial('newResourceForm', HandlebarsTemplates['resources/new']);
  
  Handlebars.registerHelper('debugger', function(){ debugger; });
})();
