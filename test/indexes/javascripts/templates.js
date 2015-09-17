!function(){var e=Handlebars.template,a=HandlebarsTemplates=HandlebarsTemplates||{};a["add-resource"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var t,l;return"<h3>Add a Resource</h3>\n<p>Add a resource for "+this.escapeExpression((l=null!=(l=a.name||(null!=e?e.name:e))?l:a.helperMissing,"function"==typeof l?l.call(e,{name:"name",hash:{},data:r}):l))+"</p>\n"+(null!=(t=this.invokePartial(n.newResourceForm,e,{name:"newResourceForm",data:r,helpers:a,partials:n}))?t:"")},usePartial:!0,useData:!0}),a["events/details"]=e({1:function(e,a,n,r){var t;return"<h4>Event Resources</h4>\n<ul>\n"+(null!=(t=a.each.call(e,null!=(t=null!=e?e.attributes:e)?t.resources:t,{name:"each",hash:{},fn:this.program(2,r,0),inverse:this.noop,data:r}))?t:"")+"</ul>\n"},2:function(e,a,n,r){var t;return"<li>"+(null!=(t=this.invokePartial(n.resourceSummary,e,{name:"resourceSummary",data:r,helpers:a,partials:n}))?t:"")+"</li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var t,l,s=this.lambda,u=this.escapeExpression;return"<h3>"+u(s(null!=(t=null!=e?e.attributes:e)?t.name:t,e))+"</h3>\n<p>"+u((l=null!=(l=a.dateRange||(null!=e?e.dateRange:e))?l:a.helperMissing,"function"==typeof l?l.call(e,{name:"dateRange",hash:{},data:r}):l))+"</p>\n<p>"+u(s(null!=(t=null!=e?e.attributes:e)?t.summary:t,e))+"</p>\n"+(null!=(t=a["if"].call(e,null!=(t=null!=(t=null!=e?e.attributes:e)?t.resources:t)?t.length:t,{name:"if",hash:{},fn:this.program(1,r,0),inverse:this.noop,data:r}))?t:"")+'<button class="add-resource">Add a Resource</button>\n'},usePartial:!0,useData:!0}),a["events/list"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h2>Events</h2>\n<hr class="bar">\n<ul></ul>\n'},useData:!0}),a["events/summary"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var t,l,s=this.escapeExpression;return"<h3>"+s(this.lambda(null!=(t=null!=e?e.attributes:e)?t.name:t,e))+"</h3>\n<p>"+s((l=null!=(l=a.dateRange||(null!=e?e.dateRange:e))?l:a.helperMissing,"function"==typeof l?l.call(e,{name:"dateRange",hash:{},data:r}):l))+"</p>\n"},useData:!0}),a["resources/new"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<form class="new-resource-form">\n<label for="new-resource-name">Name:</label>\n<input type="text" name="resource[name]">\n<label for="new-resource-summary">Summary:</label>\n<input type="text" name="resource[summary]">\n<label for="new-resource-source-url">Source URL:</label>\n<input type="text" name="resource[source_url]">\n<input type="submit" value="Submit Resource">\n</form>\n'},useData:!0}),a["resources/summary"]=e({1:function(e){var a;return'<a href="'+this.escapeExpression(this.lambda(null!=(a=null!=e?e.attributes:e)?a.source_url:a,e))+'">Source</a>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var t,l=this.lambda,s=this.escapeExpression;return"<h5>"+s(l(null!=(t=null!=e?e.attributes:e)?t.name:t,e))+"</h5>\n<p>"+s(l(null!=(t=null!=e?e.attributes:e)?t.summary:t,e))+"</p>\n"+(null!=(t=a["if"].call(e,null!=(t=null!=e?e.attributes:e)?t.source_url:t,{name:"if",hash:{},fn:this.program(1,r,0),inverse:this.noop,data:r}))?t:"")},useData:!0})}();