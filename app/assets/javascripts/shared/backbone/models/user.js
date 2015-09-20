App.Models.User = Backbone.Model.extend({

  defaults: {
    username: 'Anonymous'
  },

  isSignedIn: function(){
    return !!this.get('id');
  },

  login: function(opts){
    opts = opts || {},
    csrfToken = $('meta[name="csrf-token"]').attr('content');
    if (!opts.password) throw Error("Password required to log in");

    $.ajax({
      method: 'POST',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', csrfToken)},
      url: '/users/sign_in',
      dataType: 'json',
      context: this,
      data: {
        user: {
          email: this.get('email'),
          password: opts.password
        }
      },
      success: function(data){
        this.set('username', data.username);
        debugger;
        this.set('id', parseInt(data.id));
      }.bind(this),
      error: function(e){
        console.log(e);
      }
    });
  }
});
