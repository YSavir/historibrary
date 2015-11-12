App.Views.Session = Backbone.View.extend({
  
  initialize: function(){
    this.$el = $('.session-login');
  },

  render: function(opts){
    opts = opts || {};
    var targetTemplate = this._hasTemplate(opts.as) ?
                          opts.as :
                          'loggedOut';
    
    this.$el.html(this._template(targetTemplate));
    return this;
  },

  _template: function(targetTemplate){
    return HandlebarsTemplates['sessions/' + targetTemplate](this.model);
  },

  events: {
    'click input[name=\"login-submit\"]': 'loginUserFromView'
  },

  loginUserFromView: function(){
    var email = $('input[name="user-email"]').val(),
        password = $('input[name="user-password"]').val(),
        rememberMe = parseInt($('input[name="user-remember-me"]').val());

    this.model.loginUserWithCredentials({
      email: email,
      password: password,
      remember_me: rememberMe,
      success: this._renderAsLoggedIn.bind(this),
      error: this._renderAsLoggedOut.bind(this)
    });
  }, 

  _hasTemplate: function(template){
    return this._validTemplates.indexOf(template) > -1;
  },

  _renderAsLoggedIn: function(){
    this.render({as: 'loggedIn'});
  },

  _renderAsLoggedOut: function(){
    this.render({as: 'loggedOut'});
  },

  _validTemplates: ['loggedIn', 'loggedOut']
});
