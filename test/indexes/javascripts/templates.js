!function(){var e=Handlebars.template,a=HandlebarsTemplates=HandlebarsTemplates||{};a["add-resource"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var l,s;return"<h3>Add a Resource</h3>\n<p>Add a resource for "+this.escapeExpression((s=null!=(s=a.name||(null!=e?e.name:e))?s:a.helperMissing,"function"==typeof s?s.call(e,{name:"name",hash:{},data:r}):s))+"</p>\n"+(null!=(l=this.invokePartial(n.newResourceForm,e,{name:"newResourceForm",data:r,helpers:a,partials:n}))?l:"")},usePartial:!0,useData:!0}),a["events/details"]=e({1:function(e,a,n,r){var l;return"<h4>Event Resources</h4>\n<ul>\n"+(null!=(l=a.each.call(e,null!=(l=null!=e?e.attributes:e)?l.resources:l,{name:"each",hash:{},fn:this.program(2,r,0),inverse:this.noop,data:r}))?l:"")+"</ul>\n"},2:function(e,a,n,r){var l;return"<li>"+(null!=(l=this.invokePartial(n.resourceSummary,e,{name:"resourceSummary",data:r,helpers:a,partials:n}))?l:"")+"</li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var l,s,t=this.lambda,u=this.escapeExpression;return"<h3>"+u(t(null!=(l=null!=e?e.attributes:e)?l.name:l,e))+"</h3>\n<p>"+u((s=null!=(s=a.dateRange||(null!=e?e.dateRange:e))?s:a.helperMissing,"function"==typeof s?s.call(e,{name:"dateRange",hash:{},data:r}):s))+"</p>\n<p>"+u(t(null!=(l=null!=e?e.attributes:e)?l.summary:l,e))+"</p>\n"+(null!=(l=a["if"].call(e,null!=(l=null!=(l=null!=e?e.attributes:e)?l.resources:l)?l.length:l,{name:"if",hash:{},fn:this.program(1,r,0),inverse:this.noop,data:r}))?l:"")+'<button class="add-resource">Add a Resource</button>\n'},usePartial:!0,useData:!0}),a["events/list"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h2>Events</h2>\n<hr class="bar">\n<ul></ul>\n'},useData:!0}),a["events/summary"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var l,s,t=this.escapeExpression;return"<h3>"+t(this.lambda(null!=(l=null!=e?e.attributes:e)?l.name:l,e))+"</h3>\n<p>"+t((s=null!=(s=a.dateRange||(null!=e?e.dateRange:e))?s:a.helperMissing,"function"==typeof s?s.call(e,{name:"dateRange",hash:{},data:r}):s))+"</p>\n"},useData:!0}),a["resources/new"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<form class="new-resource-form">\n<label for="new-resource-name">Name:</label>\n<input type="text" name="resource[name]">\n<label for="new-resource-summary">Summary:</label>\n<input type="text" name="resource[summary]">\n<label for="new-resource-source-url">Source URL:</label>\n<input type="text" name="resource[source_url]">\n</form>\n'},useData:!0}),a["resources/summary"]=e({1:function(e,a,n,r){var l;return'<a href="'+this.escapeExpression((l=null!=(l=a.source_url||(null!=e?e.source_url:e))?l:a.helperMissing,"function"==typeof l?l.call(e,{name:"source_url",hash:{},data:r}):l))+'">Source</a>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,a,n,r){var l,s,t=a.helperMissing,u="function",i=this.escapeExpression;return"<h5>"+i((s=null!=(s=a.name||(null!=e?e.name:e))?s:t,typeof s===u?s.call(e,{name:"name",hash:{},data:r}):s))+"</h5>\n<p>"+i((s=null!=(s=a.summary||(null!=e?e.summary:e))?s:t,typeof s===u?s.call(e,{name:"summary",hash:{},data:r}):s))+"</p>\n"+(null!=(l=a["if"].call(e,null!=e?e.source_url:e,{name:"if",hash:{},fn:this.program(1,r,0),inverse:this.noop,data:r}))?l:"")},useData:!0})}();