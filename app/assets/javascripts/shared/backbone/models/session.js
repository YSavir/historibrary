App.Models.Session = Backbone.Model.extend({

  defaults: function(){
    return {
      user: new App.Models.User()
    }
  },

  hasLoggedInUser: function(){
    return this.get('user').isSignedIn();
  },

  addUser: function(userData, callback){
    this.set('user', new App.Models.User(userData));

    if (_.isFunction(callback)) { callback() };
  },

  currentUsername: function(){
    return this.get('user').get('username');
  },

  isActive: function(){
    return this.user && this.user.isSignedIn();
  },

  loginUserWithCredentials: function(opts){
    var data,
        deferred = $.Deferred();

    opts = opts || {};
    data = {
      user: {
        email: opts.email,
        password: opts.password,
        remember_me: opts.rememberMe || 0
      }
    };

    $.ajax({
      data: data, 
      url: '/users/sign_in',
      method: 'POST',
      dataType: 'JSON',
      context: this,
      success: function(data){
        this.addUser(data);
        deferred.resolve();
        if (_.isFunction(opts.success)) { opts.success()} ;
      },
      error: function(data){
        if (_.isFunction(opts.error)) { opts.error()} ;
      },
      beforeSend: this._getCSRFToken
    }); 

    return deferred;
  },

  syncToServerSession: function(opts){
    var csrfToken = $('meta[name="csrf-token"]').attr('content'),
        deferred = $.Deferred();
    opts = opts || {};

    $.ajax({
      url: '/sessions/current',
      method: 'GET',
      dataType: 'json',
      context: this,
      beforeSend: this._getCSRFToken,
      success: function(data){
        this.set('user', new App.Models.User(data.user));
        if (_.isFunction(opts.success)) { opts.success(data.user)} ;
        deferred.resolve();
      },
      error: function(e){  }
    });

    return deferred;
  },

  _getCSRFToken: function(xhr){
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);
  }
});
