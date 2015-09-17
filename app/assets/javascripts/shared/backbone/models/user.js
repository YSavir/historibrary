App.Models.User = Backbone.Model.extend({

  defaults: {
    name: 'Anonymous'
  },

  isSignedIn: function(){
    return false;
  },

  login: function(opts){
    opts = opts || {};
    if (!opts.password) throw Error("Password required to log in");

    $.ajax({
      method: 'POST',
      url: '/users/sign_in',
      data: {
        email: this.get('email'),
        password: opts.password
      }
    });
  }
});
