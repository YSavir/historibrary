(function() {
  var template = Handlebars.template, templates = HandlebarsTemplates = HandlebarsTemplates || {};
templates['events/details'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.lambda, alias2=this.escapeExpression;

  return "<h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n<p>"
    + alias2(((helper = (helper = helpers.dateRange || (depth0 != null ? depth0.dateRange : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"dateRange","hash":{},"data":data}) : helper)))
    + "</p>\n<p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.summary : stack1), depth0))
    + "</p>\n";
},"useData":true});
templates['events/list'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<h2>Events</h2>\n<ul></ul>\n";
},"useData":true});
templates['events/summary'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=this.escapeExpression;

  return "<h3>"
    + alias1(this.lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</h3>\n<p>"
    + alias1(((helper = (helper = helpers.dateRange || (depth0 != null ? depth0.dateRange : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"dateRange","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"useData":true});
})();