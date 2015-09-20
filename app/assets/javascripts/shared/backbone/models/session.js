App.Models.Session = Backbone.Model.extend({

  defaults: function(){
    return {
      user: new App.Models.User()
    }
  },

  hasLoggedInUser: function(){
    return this.get('user').isSignedIn();
  }
});
