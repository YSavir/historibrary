describe('views/session', function(){

  afterEach(function(){
    sandbox.restore();
  });

  describe('el', function(){
    it('.should return the .session-login element', function(){
      var view = new App.Views.Session();
      var targetEl = $('.session-login');

      expect(targetEl[0]).to.equal(view.$el[0]);
    });
  });

  describe('.render', function(){
    it('should return itself', function(){
      var view = new App.Views.Session();

      expect(view.render()).to.eql(view);
    });

    it('should render the proper template', function(){
      var view = new App.Views.Session(),
          templateStub = Stubs.Templates.SessionLogin();
          templateStub.returns('session login template');
      
      view.render();

      expect(view.$el.html()).to.equal('session login template');
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
      var model = Doubles.Models.Session(),
          view = new App.Views.Session({model: model}),
          userData = {
            email: "example@email.com",
            password: "password123"
          },
          modelUserAuthSpy = sandbox.spy(model, 'addUserWithCredentials'); 

      view.render();
      $('input[name="user-email"]').val("example@email.com");
      $('input[name="user-password"]').val("password123");
      view.loginUserFromView();

      expect(modelUserAuthSpy).to.have.been.calledWith(userData);
    });

    it('should render the welcome view if a user is logged in', function(){
      var model = Doubles.Models.Session(),
          view = new App.Views.Session({model: model}),
          modelAuthenticationStub = sandbox.stub(model, 'addUserWithCredentials'),
          templateStub = sandbox.stub(HandlebarsTemplates, 'sessions/welcome');
      templateStub.returns('Welcome Template');
      
      view.loginUserFromView();
      modelAuthenticationStub.callArg(1);


      expect(view.$el.html()).to.equal('Welcome Template');
    });

    it('should render the login view if a user is not logged in', function(){
      var model = Doubles.Models.Session(),
          view = new App.Views.Session({model: model}),
          modelAuthenticationStub = sandbox.stub(model, 'addUserWithCredentials'),
          templateStub = sandbox.stub(HandlebarsTemplates, 'sessions/login');
      templateStub.returns('Login Template');
      
      view.loginUserFromView();
      modelAuthenticationStub.callArg(2);

      expect(view.$el.html()).to.equal('Login Template');
    });
  });
});
