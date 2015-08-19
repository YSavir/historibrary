App.Views.Event = Backbone.View.extend({

  tagName: 'li',

  render: function(opts){
    opts = opts || {};
    var targetTemplate = this.extractTemplateFrom(opts.as),
        html = this._template(targetTemplate, this.model.attributes);

    this.$el.html(html)

    return this;
  },

  _template: function(template, attributes){
    template = template || 'summary';

    return HandlebarsTemplates['events/' + template](attributes);
  },

  events: {
    'click': 'renderDetails'
  },

  renderDetails: function(){
    this.render({as: 'details'});
  },

  extractTemplateFrom: function(asOption){
    var isValidTemplate = this.validTemplateOptions.indexOf(asOption);

    if(isValidTemplate) { return asOption }
    return null;
  },

  validTemplateOptions: ['summary', 'details']
  
});
