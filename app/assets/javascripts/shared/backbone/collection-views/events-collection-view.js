App.CollectionViews.Event = Backbone.View.extend({

  initialize: function(){
    this.$el = $('.events.content');
  },

  render: function(){
    this.$el.html(this._template());
    this.renderSubViews();
    return this;
  },

  _template: function(){
    return HandlebarsTemplates['events/list']();
  },

  renderSubViews: function(){
    var $list = this.$el.find('ul');
    $list.empty();

    this.collection.models.forEach(function(model){
      var view = new App.Views.Event({model: model});
      view.render();

      $list.append(view.$el);
    });
  }
});
