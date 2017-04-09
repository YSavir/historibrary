App.Routers.Event = Backbone.Router.extend({

  initialize: function(){
    this.session = new App.Models.Session();
    this.sessionView = new App.Views.Session({model: this.session});

    this.session.syncToServerSession({
      success: function(user){
        var template = user ? 'loggedIn' : 'loggedOut';
        this.sessionView.render({as: template});
      }.bind(this)
    });

    this.collection = new App.Collections.Event({
      session: this.session
    });

    this.collView = new App.CollectionViews.Event({
      collection: this.collection,
      session: this.session
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
