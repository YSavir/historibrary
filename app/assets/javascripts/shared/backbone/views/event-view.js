App.Views.Event = Backbone.View.extend({

  tagName: 'li',

  validTemplateOptions: ['summary', 'details'],

  initialize: function(opts){
    opts = opts || {};

    this.delegateEvents(this.summaryEvents);

    if (this.model) {
      var callback = function() { this.render({as: 'details'}); }
      this.listenTo(this.model, 'change', callback); 
    }

    if (opts.session) this.session = opts.session;
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
    this._setHTML(html);

    if (this.session.hasLoggedInUser()) {
      this._renderAndAppendAddResourceButton();
    }
  },

  _renderAsSummary: function(){
    var html = this._template('summary', this.model.attributes);
    debugger;
    this.delegateEvents(this.summaryEvents);

    this._setHTML(html);
  },

  _setHTML: function(html){
    this.$el.html(html);
  },

  _renderAndAppendAddResourceButton: function(){
    var html = this._template('addResourceButton');

    this.$el.append(html);
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
