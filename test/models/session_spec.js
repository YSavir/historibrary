describe('models/session', function(){

  App.Models.User = Backbone.Model.extend({
    isSignedIn: function(){
      return false;
    }
  });

  afterEach(function(){
    sandbox.restore
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
