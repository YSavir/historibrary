App.Views.Event = Backbone.View.extend({

  tagName: 'li',

  render: function(){
    this.$el.html(this._template(this.model.attributes));
    return this;
  },

  _template: function(attributes){
    return HandlebarsTemplates['events/summary'](attributes);
  }
  
});
