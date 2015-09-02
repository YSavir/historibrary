describe('views/add-resource', function(){

  afterEach(function(){
    sandbox.restore();
  });

  describe('el', function(){
    it('should be a div', function(){
      var view = new App.Views.AddResource(),
          tagName = view.el.tagName.toLowerCase();


      expect(tagName).to.equal('div');
    });

    it('should have the classes modul and add-resource-modul', function(){
      var view = new App.Views.AddResource();
        
      expect(view.el.className).to.equal('modul add-resource-modul');
    });
  });

  describe('render', function(){
    it('should return itself', function(){
      var view = new App.Views.AddResource();

      expect(view.render()).to.eql(view);
    });

    it('should populate its element with the template body', function(){
      var view = new App.Views.AddResource(),
          templateStub = sandbox.stub(HandlebarsTemplates, 'add-resource');
      templateStub.returns('foo');

      view.render();

      expect(view.$el.html()).to.equal('foo');
    });
  });
});
