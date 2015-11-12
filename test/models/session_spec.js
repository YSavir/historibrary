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

  describe('.currentUsername', function(){
    it('should return the username of the current user', function(){
      var user = new App.Models.User({username: 'they'}),
          session = new App.Models.Session({user: user});

      expect(session.currentUsername()).to.eql('they');
    });
  });

  describe('.loginUserWithCredentials', function(){
    it('should send a request to the server to login the user', function(){
      var args,
          session = new App.Models.Session(),
          ajaxSpy = sandbox.spy($, 'ajax');
      
      session.loginUserWithCredentials({email: 'email', password: 'password'});
      args = ajaxSpy.args[0][0];

      expect(ajaxSpy).to.have.been.called;
      expect(args).to.have.deep.property('data.user.email', 'email');
      expect(args).to.have.deep.property('data.user.password', 'password');
      expect(args).to.have.deep.property('data.user.remember_me', 0);
      expect(args).to.have.property('url', '/users/sign_in');
      expect(args).to.have.property('method', 'POST');
      expect(args).to.have.property('dataType', 'JSON');
      expect(args).to.have.property('context', session);
      expect(args).to.have.property('beforeSend', session._getCSRFToken);
    });

    describe('when successfull', function(){
      it('should invoke the success callback', function(){
        var session = new App.Models.Session(),
            spy = sandbox.spy();

        server.respondWith('POST', '/users/sign_in', [
          200,
          {'Content-Type': 'application/json'},
          JSON.stringify({user:{}})
        ]);

        session.loginUserWithCredentials({
          email: 'email',
          password: 'password',
          success: spy
        });
        server.respond();

        expect(spy).to.have.been.called;
      });
    });

    describe('when not successful', function(){
      it('should invoke the error callback', function(){
        var session = new App.Models.Session(),
            spy = sandbox.spy();

        server.respondWith('POST', '/user/sign_in', [
          401,
          {'Content-Type': 'application/json'},
          JSON.stringify({error: 'Unauthorized'})
        ]);

        session.loginUserWithCredentials({
          email: 'email',
          password: 'password',
          error: spy
        });
        server.respond();

        expect(spy).to.have.been.called;
      });
    });
  });

  describe('.addUser', function(){
    describe('without user data', function(){
      it('should add a default user model', function(){
        var session = new App.Models.Session(),
            newUser = new App.Models.User();

        session.set('user', null);
        session.addUser();

        expect(session.get('user').attributes).to.deep.equal(newUser.attributes);
      });
    });

    describe('with user data', function(){
      it('should add a user with that data', function(){
        var session = new App.Models.Session(),
            userData = {id: 1, email: 'email', username: 'they'};

        session.set('user', null);
        session.addUser(userData);

        expect(session.get('user').attributes).to.deep.equal(userData);
      });
    });

    it('should call the callback', function(){
      var session = new App.Models.Session(),
          spy = sandbox.spy();

      session.addUser({}, spy)

      expect(spy).to.have.been.called;
    });
  });

  describe('.syncToServerSession', function(){
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

        it('should call the success callback', function(){
          var session = new App.Models.Session(),
              spy = sandbox.spy(),
              user = {};

          serverSessionRespondWith({user: user});
          session.syncToServerSession({success: spy});
          server.respond();
          
          expect(spy).to.have.been.calledWith(user);
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
