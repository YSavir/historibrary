$(function(){
  var vm = new Vue({
    el: '#session-login',

    data: {
      session: new App.Models.Session(),
      user: new App.Models.User(),
      userEmail: '',
      userPassword: '',
      rememberMe: false
    },

    methods: {
      activeSession: function(){
        return this.user.isSignedIn();
      },
      signIn: function(){
        var email = $('input[name="user-email"]').val(),
            password = $('input[name="user-password"]').val(),
            rememberMe = parseInt($('input[name="user-remember-me"]').val()),
            vm = this;

        this.session.loginUserWithCredentials({
          email: this.userEmail,
          password: this.userPassword,
          remember_me: this.rememberMe
        }).then(function(){
          vm.user = vm.session.get('user');
        });
      }
    },
  })
});
