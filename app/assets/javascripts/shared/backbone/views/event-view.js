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

    if (opts.as === 'details') {
      this._renderAsDetails();

    } else if (opts.as === 'summary') {
      this._renderAsSummary();

    } else {
      this._renderAsSummary();
    };

    return this;
  },

  _renderAsDetails: function(){
    var html = this._template('details', this.model.attributes);
    this.delegateEvents(this.detailEvents);

    this._appendWithHTML(html);
  },

  _renderAsSummary: function(){
    var html = this._template('summary', this.model.attributes);
    this.delegateEvents(this.summaryEvents);

    this._appendWithHTML(html);
  },

  _appendWithHTML: function(html){
    this.$el.html(html);
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
    this.trigger('renderDetails', this);
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
