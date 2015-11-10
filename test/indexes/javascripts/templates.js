!function(){var e=Handlebars.template,a=HandlebarsTemplates=HandlebarsTemplates||{};a["add-resource"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,t){var r,s;return"<h3>Add a Resource</h3>\n<p>Add a resource for "+this.escapeExpression((s=null!=(s=a.name||(null!=e?e.name:e))?s:a.helperMissing,"function"==typeof s?s.call(e,{name:"name",hash:{},data:t}):s))+"</p>\n"+(null!=(r=this.invokePartial(n.newResourceForm,e,{name:"newResourceForm",data:t,helpers:a,partials:n}))?r:"")},usePartial:!0,useData:!0}),a["events/addResourceButton"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<button class="add-resource">Add a Resource</button>\n'},useData:!0}),a["events/details"]=e({1:function(e,a,n,t){var r;return"<h4>Event Resources</h4>\n<ul>\n"+(null!=(r=a.each.call(e,null!=(r=null!=e?e.attributes:e)?r.resources:r,{name:"each",hash:{},fn:this.program(2,t,0),inverse:this.noop,data:t}))?r:"")+"</ul>\n"},2:function(e,a,n,t){var r;return"<li>"+(null!=(r=this.invokePartial(n.resourceSummary,e,{name:"resourceSummary",data:t,helpers:a,partials:n}))?r:"")+"</li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,t){var r,s,u=this.lambda,l=this.escapeExpression;return"<h3>"+l(u(null!=(r=null!=e?e.attributes:e)?r.name:r,e))+"</h3>\n<p>"+l((s=null!=(s=a.dateRange||(null!=e?e.dateRange:e))?s:a.helperMissing,"function"==typeof s?s.call(e,{name:"dateRange",hash:{},data:t}):s))+"</p>\n<p>"+l(u(null!=(r=null!=e?e.attributes:e)?r.summary:r,e))+"</p>\n"+(null!=(r=a["if"].call(e,null!=(r=null!=(r=null!=e?e.attributes:e)?r.resources:r)?r.length:r,{name:"if",hash:{},fn:this.program(1,t,0),inverse:this.noop,data:t}))?r:"")},usePartial:!0,useData:!0}),a["events/list"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h2>Events</h2>\n<hr class="bar">\n<ul></ul>\n'},useData:!0}),a["events/summary"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,t){var r,s,u=this.escapeExpression;return"<h3>"+u(this.lambda(null!=(r=null!=e?e.attributes:e)?r.name:r,e))+"</h3>\n<p>"+u((s=null!=(s=a.dateRange||(null!=e?e.dateRange:e))?s:a.helperMissing,"function"==typeof s?s.call(e,{name:"dateRange",hash:{},data:t}):s))+"</p>\n"},useData:!0}),a["resources/new"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<form class="new-resource-form">\n<label for="new-resource-name">Name:</label>\n<input type="text" name="resource[name]">\n<label for="new-resource-summary">Summary:</label>\n<input type="text" name="resource[summary]">\n<label for="new-resource-source-url">Source URL:</label>\n<input type="text" name="resource[source_url]">\n<input type="submit" value="Submit Resource">\n</form>\n'},useData:!0}),a["resources/summary"]=e({1:function(e){var a;return'<a href="'+this.escapeExpression(this.lambda(null!=(a=null!=e?e.attributes:e)?a.source_url:a,e))+'">Source</a>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,t){var r,s=this.lambda,u=this.escapeExpression;return"<h5>"+u(s(null!=(r=null!=e?e.attributes:e)?r.name:r,e))+"</h5>\n<p>"+u(s(null!=(r=null!=e?e.attributes:e)?r.summary:r,e))+"</p>\n"+(null!=(r=a["if"].call(e,null!=(r=null!=e?e.attributes:e)?r.source_url:r,{name:"if",hash:{},fn:this.program(1,t,0),inverse:this.noop,data:t}))?r:"")},useData:!0}),a["sessions/loggedIn"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return""},useData:!0}),a["sessions/loggedOut"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return""},useData:!0})}();