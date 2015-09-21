App.CollectionViews.Event = Backbone.View.extend({

  views: [],

  initialize: function(opts){
    opts = opts || {};
    var coll = this.collection;
    if (opts.session) this.session = opts.session;

    this.$el = $('.events.content');
    this.resourceCollection = new App.Collections.Resource;

    coll.respondToNewResource(this.resourceCollection);
  },

  render: function(){
    this.$el.html(this._template());
    this.renderSubViews();
    return this;
  },

  _template: function(){
    return HandlebarsTemplates['events/list']();
  },

  createSubView: function(model){
    var view = new App.Views.Event({
      model: model,
      session: this.session
    });

    this.views.push(view);
    return view;
  },

  renderSubView: function(view){
    view.render();
    this.$el.find('ul').append(view.$el);

    this.listenTo(view, 'renderDetails', this.collapseInactiveViews);
    this.listenTo(view, 'addResource', this.newResourceForEvent);
  },

  renderSubViews: function(){
    this.$el.find('ul').empty();
    this.views = [];

    this.collection.models.forEach(function(model){
      var view = this.createSubView(model);
      this.renderSubView(view);
    }.bind(this));
  },

  collapseInactiveViews: function(activeView){
    var viewsToCollapse = this.views.forEach(function(view){
      if ( view === activeView) return false;
      view.render({as: 'summary'});
    });
  },

  newResourceForEvent: function(subView){
    var addResourceView = new App.Views.AddResource({
      model: subView.model,
      collection: this.resourceCollection
    });
    addResourceView.render();
  }
});
