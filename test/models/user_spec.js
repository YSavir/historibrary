describe('models/user', function(){

  describe('defaults', function(){
    it('should set the name to \'Anonymous\'', function(){
      var user = new App.Models.User();

      expect(user.get('username')).to.equal('Anonymous');
    });
  });

  describe('.isSignedIn', function(){
    it('should default to false', function(){
      var user = new App.Models.User();

      expect(user.isSignedIn()).to.be.false;
    });
  });
});
