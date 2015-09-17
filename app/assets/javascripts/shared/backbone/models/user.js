App.Models.User = Backbone.Model.extend({

  defaults: {
    username: 'Anonymous'
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
      context: this,
      data: {
        email: this.get('email'),
        password: opts.password
      },
      success: function(data){
        this.set('username', data.username);
        this.set('id', parseInt(data.id));
      }.bind(this),
    });
  }
});
