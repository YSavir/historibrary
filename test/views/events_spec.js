describe('views/events', function(){

  afterEach(function(){
    sandbox.restore();
  });

  describe('.el', function(){

    it('should return a list element', function(){
      var view = new App.Views.Event();

      var tagName = view.el.tagName.toLowerCase();

      expect(tagName).to.equal('li');
    });
  });

  describe('.render', function(){

    it('should return itself', function(){
      var event = new App.Views.Event({model: {}});

      expect(event.render()).to.eql(event);
    });

    describe('when rendering a summary', function(){
      it('should populate its element with summary content', function(){
        var event = mocks.models.event();
        var view = new App.Views.Event({model: event});
        var templateStub = stubs.templates.eventSummary();
        templateStub.returns(templateStrings.eventSummary);

        view.render();

        expect(view.$el.html()).to.equal(templateStrings.eventSummary);
      });
    });

  });
});
