describe('models/session', function(){
  var server;

  beforeEach(function(){
    server = sinon.fakeServer.create();
  });

  afterEach(function(){
    sandbox.restore();
    server.restore();
  });

  App.Models.User = Backbone.Model.extend({
    defaults: {
      username: 'anonymous'
    },
    isSignedIn: function(){
      return false;
    }
  });

  var serverSessionRespondWith = function(returnData){
    server.respondWith('GET', '/sessions/current', [
      200,
      {'Content-Type': 'application/json'},
      JSON.stringify(returnData)
    ]);
  }

  describe('.initialize', function(){
    it('should call .syncToServerSession', function(){
      var stub = sandbox.stub(App.Models.Session.prototype, 'syncToServerSession');

      new App.Models.Session();

      expect(stub).to.have.been.called;
    });
  });

  describe('loginUserWithCredentials', function(){
    it('should send a request to the server to login the user', function(){
      var args,
          credentials = {email: 'email', password: 'password'},
          session = new App.Models.Session(),
          ajaxSpy = sandbox.spy($, 'ajax');
      
      session.loginUserWithCredentials('email', 'password');
      args = ajaxSpy.args[0][0];

      expect(ajaxSpy).to.have.been.called;
      expect(args).to.have.deep.property('data.user.email', 'email');
      expect(args).to.have.deep.property('data.user.password', 'password');
      expect(args).to.have.deep.property('data.user.remember_me', 0);
      expect(args).to.have.property('url', '/users/sign_in');
      expect(args).to.have.property('method', 'POST');
      expect(args).to.have.property('dataType', 'JSON');
      expect(args).to.have.property('context', session);
      expect(args).to.have.property('success', session.addUser);
      expect(args).to.have.property('error', session.logError);
      expect(args).to.have.property('beforeSend', session.getCSRFToken);
    });
  });

  describe('syncToServerSession', function(){
    describe('when the session\'s user is not logged in', function(){
      describe('but the server has a user', function(){
        it('should set the user to the user signed in on the server', function(){
          var session = new App.Models.Session(),
              userDetails = {
                  id: 1,
                  username: 'test name',
                  email: 'test@email.com'
                };

          serverSessionRespondWith({user: userDetails});
          session.syncToServerSession();
          server.respond();

          expect(session.get('user').attributes).to.deep.equal(userDetails);
        });
      });

      describe('but the server has no current user', function(){
        it('should set the user to an empty user model', function(){
          var initialUser = new App.Models.User({
            id: 1,
            username: 'test name',
            email: 'test@email.com'
          }),
          session = new App.Models.Session({user: initialUser});

          serverSessionRespondWith({user: null});
          session.syncToServerSession();
          server.respond();
          
          expect(session.get('user').attributes).to.deep.equal(new App.Models.User().attributes);
        });
      });
    });
  });

  describe('.hasLoggedInUser', function(){
    describe('when the user is not logged in', function(){
      it('should return false', function(){
        var session = new App.Models.Session();

        expect(session.hasLoggedInUser()).to.be.false;
      });
    });

    describe('when a user is logged in', function(){
      it('should return true', function(){
        var session = new App.Models.Session(),
            loggedInStub = sandbox.stub(session.get('user'), 'isSignedIn');
        loggedInStub.returns(true);

        expect(session.hasLoggedInUser()).to.be.true;
      });
    });
  });
});
