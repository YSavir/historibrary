App.Views.Session = Backbone.View.extend({
  
  initialize: function(){
    this.$el = $('.session-login');
  },

  render: function(opts){
    opts = opts || {};
    var targetTemplate = this._hasTemplate(opts.as) ?
                          opts.as :
                          'loggedIn';
    
    this.$el.html(this._template(targetTemplate));
    return this;
  },

  _template: function(targetTemplate){
    return HandlebarsTemplates['sessions/' + targetTemplate]();
  },

  events: {
    'click input[name=\"login-submit\"]': 'loginUserFromView'
  },

  loginUserFromView: function(){
    var userInput = {
          email: $('input[name="user-email"]').val(),
          password: $('input[name="user-password"]').val()
        },
        success = function(){
          this.render({as: 'welcome'});
        }.bind(this),
        error = function(){
          this.render({as: 'login'});
        }.bind(this);

    this.model.addUserWithCredentials(userInput, success, error);
  }, 

  _hasTemplate: function(template){
    return this._validTemplates.indexOf(template) > -1;
  },

  _validTemplates: ['loggedIn', 'loggedOut']
});
