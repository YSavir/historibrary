!function(){var e=Handlebars.template,n=HandlebarsTemplates=HandlebarsTemplates||{};n["add-resource"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,r){var t,s;return"<h3>Add a Resource</h3>\n<p>Add a resource for "+this.escapeExpression((s=null!=(s=n.name||(null!=e?e.name:e))?s:n.helperMissing,"function"==typeof s?s.call(e,{name:"name",hash:{},data:r}):s))+"</p>\n"+(null!=(t=this.invokePartial(a.newResourceForm,e,{name:"newResourceForm",data:r,helpers:n,partials:a}))?t:"")},usePartial:!0,useData:!0}),n["events/addResourceButton"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<button class="add-resource">Add a Resource</button>\n'},useData:!0}),n["events/details"]=e({1:function(e,n,a,r){var t;return"<h4>Event Resources</h4>\n<ul>\n"+(null!=(t=n.each.call(e,null!=(t=null!=e?e.attributes:e)?t.resources:t,{name:"each",hash:{},fn:this.program(2,r,0),inverse:this.noop,data:r}))?t:"")+"</ul>\n"},2:function(e,n,a,r){var t;return"<li>"+(null!=(t=this.invokePartial(a.resourceSummary,e,{name:"resourceSummary",data:r,helpers:n,partials:a}))?t:"")+"</li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,r){var t,s,u=this.lambda,l=this.escapeExpression;return"<h3>"+l(u(null!=(t=null!=e?e.attributes:e)?t.name:t,e))+"</h3>\n<p>"+l((s=null!=(s=n.dateRange||(null!=e?e.dateRange:e))?s:n.helperMissing,"function"==typeof s?s.call(e,{name:"dateRange",hash:{},data:r}):s))+"</p>\n<p>"+l(u(null!=(t=null!=e?e.attributes:e)?t.summary:t,e))+"</p>\n"+(null!=(t=n["if"].call(e,null!=(t=null!=(t=null!=e?e.attributes:e)?t.resources:t)?t.length:t,{name:"if",hash:{},fn:this.program(1,r,0),inverse:this.noop,data:r}))?t:"")},usePartial:!0,useData:!0}),n["events/list"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<h2>Events</h2>\n<hr class="bar">\n<ul></ul>\n'},useData:!0}),n["events/summary"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,r){var t,s,u=this.escapeExpression;return"<h3>"+u(this.lambda(null!=(t=null!=e?e.attributes:e)?t.name:t,e))+"</h3>\n<p>"+u((s=null!=(s=n.dateRange||(null!=e?e.dateRange:e))?s:n.helperMissing,"function"==typeof s?s.call(e,{name:"dateRange",hash:{},data:r}):s))+"</p>\n"},useData:!0}),n["resources/new"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return'<form class="new-resource-form">\n<label for="new-resource-name">Name:</label>\n<input type="text" name="resource[name]">\n<label for="new-resource-summary">Summary:</label>\n<input type="text" name="resource[summary]">\n<label for="new-resource-source-url">Source URL:</label>\n<input type="text" name="resource[source_url]">\n<input type="submit" value="Submit Resource">\n</form>\n'},useData:!0}),n["resources/summary"]=e({1:function(e){var n;return'<a href="'+this.escapeExpression(this.lambda(null!=(n=null!=e?e.attributes:e)?n.source_url:n,e))+'">Source</a>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,r){var t,s=this.lambda,u=this.escapeExpression;return"<h5>"+u(s(null!=(t=null!=e?e.attributes:e)?t.name:t,e))+"</h5>\n<p>"+u(s(null!=(t=null!=e?e.attributes:e)?t.summary:t,e))+"</p>\n"+(null!=(t=n["if"].call(e,null!=(t=null!=e?e.attributes:e)?t.source_url:t,{name:"if",hash:{},fn:this.program(1,r,0),inverse:this.noop,data:r}))?t:"")},useData:!0}),n["sessions/loggedIn"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(e,n,a,r){var t;return"Welcome, "+this.escapeExpression((t=null!=(t=n.currentUsername||(null!=e?e.currentUsername:e))?t:n.helperMissing,"function"==typeof t?t.call(e,{name:"currentUsername",hash:{},data:r}):t))+'\n<div data-no-turbolinks>\n<a data-method="delete" href="/users/sign_out" rel="nofollow">Sign Out</a>\n</div>\n'},useData:!0}),n["sessions/loggedOut"]=e({compiler:[6,">= 2.0.0-beta.1"],main:function(){return"<input name='user-email' placeholder='email'>\n<input type='password' name='user-password' placeholder='password'>\n<input type='checkbox' name='user-remember-me' value='1'>\n<input type='submit' name='login-submit' value='Sign In'>\n<a href='/users/password/new'>Forgot your password?</a>\n<a href='/users/sign_up>Sign Up</a>\n"},useData:!0})}();