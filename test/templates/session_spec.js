describe('templates/session', function(){

  afterEach(function(){
    sandbox.restore();
  });

  describe('loggedIn', function(){
    it('should render the HTML for a logged in session', function(){
      var user = Doubles.Models.User(),
          session = new App.Models.Session({user: user}),
          targetHTML = "Welcome, they\n"
                     + "<div data-no-turbolinks>\n"
                     + "<a data-method=\"delete\" href=\"/users/sign_out\" rel=\"nofollow\">Sign Out</a>\n"
                     + "</div>\n"

      expect(HandlebarsTemplates['sessions/loggedIn'](session)).to.equal(targetHTML);
    });
  });

  describe('loggedOut', function(){
    it('should render the HTML for a logged out session', function(){
      var targetHTML = "<input name='user-email' placeholder='email'>\n"
                     + "<input type='password' name='user-password' placeholder='password'>\n"
                     + "<input type='checkbox' name='user-remember-me' value='1'>\n"
                     + "<input type='submit' name='login-submit' value='Sign In'>\n"
                     + "<a href='/users/password/new'>Forgot your password?</a>\n"
                     + "<a href='/users/sign_up>Sign Up</a>\n";

      expect(HandlebarsTemplates['sessions/loggedOut']()).to.equal(targetHTML);
    });
  });

});
