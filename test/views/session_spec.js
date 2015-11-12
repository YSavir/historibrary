describe('views/session', function(){
  var usernameInput = "<input name='user-email'>",
      passwordInput = "<input name='user-password'>",
      rememberMeInput = "<input name='user-remember-me' type='checkbox'>";

  afterEach(function(){
    sandbox.restore();
    $('div.session-login').empty();
  });

  var buildView = function(model){
    model = model || Doubles.Models.Session();
    return new App.Views.Session({
      model: model,
    });
  }

  itShouldBehaveAsBackboneView( buildView(), {
    templates: ['sessions/loggedIn', 'sessions/loggedOut']
  });

  describe('el', function(){
    it('.should return the .session-login element', function(){
      var view = buildView();
      var targetEl = $('.session-login');

      expect(targetEl[0]).to.equal(view.$el[0]);
    });
  });

  describe('render', function(){
    it('should pass the model to the template', function(){
      var view = buildView(),
          templateSpy = sandbox.spy(HandlebarsTemplates, 'sessions/loggedOut');

      view.render();

      expect(templateSpy).to.have.been.calledWith(view.model);
    });

    it('should render the loggedOut template by default', function(){
      var view = buildView(),
          templateSpy = sandbox.spy(HandlebarsTemplates, 'sessions/loggedOut');

      view.render();

      expect(templateSpy).to.have.been.called;
    });
  });

  describe('events', function(){
    it('should forward clicking on submit to `.loginUserFromView`', function(){
      var view = new App.Views.Session({}),
          eventName = "click input[name=\"login-submit\"]"


      expect(view.events[eventName]).to.equal("loginUserFromView");
    });
  });

  describe('loginUserFromView', function(){
    it('should have its session model add the user from the input data', function(){
      var view = buildView(),
          email = "example@email.com",
          password = "password123",
          remember_me = 1,
          loginSpy = sandbox.spy(view.model, 'loginUserWithCredentials'); 

      $('div.session-login').html(usernameInput + passwordInput + rememberMeInput);
      $('input[name="user-email"]').val(email);
      $('input[name="user-remember-me"]').val(remember_me);
      $('input[name="user-password"]').val(password);
      view.loginUserFromView();

      expect(loginSpy).to.have.been.called;
      expect(loginSpy.args[0][0]).to.have.property('email', email);
      expect(loginSpy.args[0][0]).to.have.property('password', password);
      expect(loginSpy.args[0][0]).to.have.property('remember_me', remember_me);
    });
  });
});
