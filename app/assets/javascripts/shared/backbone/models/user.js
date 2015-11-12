App.Models.User = Backbone.Model.extend({

  defaults: {
    username: 'Anonymous'
  },

  isSignedIn: function(){
    return !!this.get('id');
  }
});
