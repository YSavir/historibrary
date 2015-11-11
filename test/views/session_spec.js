describe('views/session', function(){
  var usernameInput = "<input name='user-email'>",
      passwordInput = "<input name='user-password'>";

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
          userData = {
            email: "example@email.com",
            password: "password123"
          },
          modelUserAuthSpy = sandbox.spy(view.model, 'addUserWithCredentials'); 

      $('div.session-login').html(usernameInput + passwordInput);
      $('input[name="user-email"]').val("example@email.com");
      $('input[name="user-password"]').val("password123");
      view.loginUserFromView();

      expect(modelUserAuthSpy).to.have.been.calledWith(userData,
                                                       view._renderAsLoggedIn,
                                                       view._renderAsLoggedOut);
    });
  });
});
