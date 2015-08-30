App.CollectionViews.Event = Backbone.View.extend({

  views: [],

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
    var $list = this.$el.find('ul'),
        collView = this;

    $list.empty();
    this.views = [];

    this.collection.models.forEach(function(model){
      var view = new App.Views.Event({model: model});
      this.views.push(view);
      view.render();
      view.$el.on('click', function(){ collView.collapseInactiveViews(view) });

      $list.append(view.$el);
    }.bind(this));
  },

  collapseInactiveViews: function(activeView){
    var viewsToCollapse = this.views.forEach(function(view){
      if ( view === activeView) return false;
      view.render({as: 'summary'});
    });
  }
});
