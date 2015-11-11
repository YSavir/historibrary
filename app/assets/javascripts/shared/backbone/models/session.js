App.Models.Session = Backbone.Model.extend({

  defaults: function(){
    return {
      user: new App.Models.User()
    }
  },

  initialize: function(){
    this.syncToServerSession();
  },

  hasLoggedInUser: function(){
    return this.get('user').isSignedIn();
  },

  loginUserWithCredentials: function(email, password, rememberMe){
    rememberMe = rememberMe || 0;

    $.ajax({
      data: {
        user: {
          email: email,
          password: password,
          remember_me: rememberMe
        }
      },
      url: '/users/sign_in',
      method: 'POST',
      dataType: 'JSON',
      context: this,
      success: this.addUser,
      error: this.logError,
      beforeSend: this.getCSRFToken
    }); 
  },

  syncToServerSession: function(){
    var csrfToken = $('meta[name="csrf-token"]').attr('content');

    $.ajax({
      url: '/sessions/current',
      method: 'GET',
      dataType: 'json',
      context: this,
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', csrfToken)},
      success: function(data){
        this.set('user', new App.Models.User(data.user));
      },
      error: function(e){  }
    });
  }
});
