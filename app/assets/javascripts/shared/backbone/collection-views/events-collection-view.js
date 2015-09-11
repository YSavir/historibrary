App.CollectionViews.Event = Backbone.View.extend({

  views: [],

  initialize: function(){
    var coll = this.collection;

    this.$el = $('.events.content');
    this.resourceCollection = new App.Collections.Resource;

    coll.listenTo(this.resourceCollection, 'submitResource', coll.addNewResource);
    // coll.listenTo(this.resourceCollection, 'submitResource', function(){debugger;});
  },

  render: function(){
    this.$el.html(this._template());
    this.renderSubViews();
    return this;
  },

  _template: function(){
    return HandlebarsTemplates['events/list']();
  },

  renderSubView: function(view){
    this.views.push(view);
    view.render();
    this.$el.find('ul').append(view.$el);

    this.listenTo(view, 'renderDetails', this.collapseInactiveViews);
    this.listenTo(view, 'addResource', this.newResourceForEvent);
  },

  renderSubViews: function(){
    this.$el.find('ul').empty();
    this.views = [];

    this.collection.models.forEach(function(model){
      var view = new App.Views.Event({model: model});
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
    var addResourceView = new App.Views.AddResource({model: subView.model});
    this.resourceCollection.listenForNewResource(addResourceView, subView);
    addResourceView.render();
  }
});
