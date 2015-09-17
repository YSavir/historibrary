App.Routers.Event = Backbone.Router.extend({

  initialize: function(){
    this.collection = new App.Collections.Event();
    this.collView = new App.CollectionViews.Event({
      collection: this.collection
    });

    this.collection.fetch({
      success: function(coll, response){
        // get function for current path and call it
        // in case of timing issues
        var currentPath = Backbone.history.location.pathname;
        var pathFuncName = this.routes[currentPath];

        this[pathFuncName]();
      }.bind(this)
    });
  },

  routes: {
    '/events': 'index',
    '/': 'index'
  },

  index: function(){
    this.collView.render();
  }
});
