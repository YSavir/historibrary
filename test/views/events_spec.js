describe('views/events', function(){

  afterEach(function(){
    sandbox.restore();
  });

  describe('events', function(){
    describe('click', function(){
      it('should be set to renderDetails', function(){
        var view = new App.Views.Event();

        expect(view.events.click).to.equal('renderDetails');
      });
    });
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
        var model = mocks.models.event(),
            view = new App.Views.Event({model: model}),
            templateStub = stubs.templates.eventSummary();
        templateStub.returns(templateStrings.eventSummary);

        view.render({as: 'summary'});

        expect(view.$el.html()).to.equal(templateStrings.eventSummary);
      });
    });

    describe('when rendering as details', function(){
      it('should populate its element with details content', function(){
        var model = mocks.models.event(),
            view = new App.Views.Event({model: model}),
            templateStub = stubs.templates.eventDetails();
        templateStub.returns(templateStrings.eventDetails);

        view.render({as: 'details'});

        expect(view.$el.html()).to.equal(templateStrings.eventDetails);
      });
    });
  });

  describe('renderDetails', function(){
    it('should call render as \'details\'', function(){
      var model = mocks.models.event(),
          view = new App.Views.Event({model: model}),
          renderSpy = sandbox.spy(view, 'render'),
          argumentsHash = {as: 'details'};

      view.renderDetails();
      var renderedAsDetails = renderSpy.calledWith(argumentsHash);
      
      expect(renderedAsDetails).to.be.true;
    });
  });
});
