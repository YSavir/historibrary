App.Views.Event = Backbone.View.extend({

  tagName: 'li',

  validTemplateOptions: ['summary', 'details'],

  initialize: function(){
    this.delegateEvents(this.summaryEvents);
    if (this.model) {
      var callback = function() { this.render({as: 'details'}); }
      this.listenTo(this.model, 'change', callback); 
    }
  },

  render: function(opts){
    opts = opts || {};
    var targetTemplate = this.extractTemplateFrom(opts.as),
        html = this._template(targetTemplate, this.model.attributes);

    this.$el.html(html)

    return this;
  },

  _template: function(template, attributes){
    template = template || 'summary';

    return HandlebarsTemplates['events/' + template](this.model);
  },

  summaryEvents: {
    'click': 'renderDetails'
  },

  detailEvents: {
    'click button.add-resource': 'triggerAddResource'
  },

  renderDetails: function(){
    this.render({as: 'details'});
    this.delegateEvents(this.detailEvents);
  },

  extractTemplateFrom: function(asOption){
    var isValidTemplate = this.validTemplateOptions.indexOf(asOption);

    if(isValidTemplate) { return asOption }
    return null;
  },

  // Listened to by:
  // * App/CollectionViews/Event.renderSubView
  triggerAddResource: function(){
    this.trigger('addResource', this);
  }
  
});
