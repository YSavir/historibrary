App.Views.AddResource = Backbone.View.extend({

  className: 'modul add-resource-modul',

  initialize: function(){
    this.render();
    this.appendToBody();
  },
  
  render: function(){
    this.$el.html(this._template());
    return this;
  },

  events: {
    'click .submit-resource': 'submitResource'
  },

  _template: function(){
    return HandlebarsTemplates['add-resource']();
  },

  appendToBody: function(){
    $('body').append(this.$el);
  }
});
