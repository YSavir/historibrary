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
