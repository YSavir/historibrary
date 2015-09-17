describe('models/user', function(){
  var server;

  beforeEach(function(){
    server = sinon.fakeServer.create();
  });

  afterEach(function(){
    server.restore();
  });

  describe('defaults', function(){
    it('should set the name to \'Anonymous\'', function(){
      var user = new App.Models.User();

      expect(user.get('username')).to.equal('Anonymous');
    });
  });

  describe('.isSignedIn', function(){
    describe('and the user is not signed in', function(){
      it('should return false', function(){
        var user = new App.Models.User();

        expect(user.isSignedIn()).to.be.false;
      });
    });
  });

  describe('login', function(){
    it('should make an AJAX request to log in the user', function(){
      var user = new App.Models.User({
        email: 'test@email.com'
      }),
      loginData = {
        email: user.get('email'),
        password: 'password123'
      };

      user.login({password: 'password123'});
      var request = server.requests[0];

      expect(request).to.have.property('method', 'POST');
      expect(request).to.have.property('url', '/users/sign_in');
      expect(request.requestBody).to.equal($.param(loginData));
    });
      
    describe('when given proper credentials', function(){
      it('should set the user\'s data', function(){
        var user = new App.Models.User({
          email: 'test@email.com',
          password: 'password123'
        }),
        responseData = {
          email: 'test@email.com',
          id: '1',
          username: 'test user'
        };

        server.respondWith('POST', '/users/sign_in', [
         200,
         {'Content-Type': 'application/json'},
         JSON.stringify(responseData)
        ]);
        user.login({password: 'password123'});
        server.respond();

        expect(user.get('username')).to.equal('test user'); 
        expect(user.get('id')).to.eql(1);
      });
    });
  });
});
