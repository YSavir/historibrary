describe('views/events', function(){

  afterEach(function(){
    sandbox.restore();
  });

  var buildEvent = function(model){
    model = model || Doubles.Models.Event();
    return new App.Views.Event({
      model: model,
      session: {
        hasLoggedInUser: function(){ return true; }
      }
    });
  }

  itShouldBehaveAsBackboneView(buildEvent(), {
    templates: ['events/summary']
  });

  describe('initialize', function(){
    it('should listen to changes on its model and render on trigger', function(){
      var view = buildEvent(),
          renderStub = sandbox.stub(view, 'render');

      view.model.trigger('change');

      expect(renderStub).to.have.been.called;
      expect(renderStub.args[0][0]).to.have.property('as', 'details');
    });
  });

  describe('summaryEvents', function(){
    describe('click', function(){
      it('should be set to renderDetails', function(){
        var view = buildEvent();

        expect(view.summaryEvents.click).to.equal('renderDetails');
      });
    });
  });

  describe('detailEvents', function(){
    describe('click button.add-resource', function(){
      it('should be set to triggerAddResource', function(){
        var view = buildEvent();

        expect(view.detailEvents['click button.add-resource']).to.equal('triggerAddResource');
      });
    });
  });

  describe('.render', function(){
    describe('when rendering a summary', function(){
      it('should remove the \'detail\' class', function(){
        var model = Doubles.Models.Event(),
            view = buildEvent(model);

        view.render({as: 'summary'});

        expect(view.$el).to.not.have.class('details');
      });
    });

    describe('when rendering as details', function(){
      describe('for a logged in user', function(){
        it('should render details with an add resource button', function(){
          var view = buildEvent(),
              detailsStub = sandbox.stub(HandlebarsTemplates, 'events/details'),
              addStub = sandbox.stub(HandlebarsTemplates, 'events/addResourceButton');
          sandbox.stub(view.session, 'hasLoggedInUser').returns(true);
          detailsStub.withArgs(view.model).returns(function(){ return 'details' });
          addStub.withArgs(view.model).returns(function(){ return 'add' });

          view.render({as: 'details'});

          expect(view.$el.html()).to.equal('detailsadd');
        });
      });

      describe('for a user that is not logged in', function(){
        it('should render details but no add resource button', function(){
          var view = buildEvent(),
              detailsStub = sandbox.stub(HandlebarsTemplates, 'events/details');
          sandbox.stub(view.session, 'hasLoggedInUser').returns(false);
          detailsStub.withArgs(view.model).returns(function(){ return 'details' });

          view.render({as: 'details'});

          expect(view.$el.html()).to.equal('details');
        });
      });
    });
  });

  describe('renderDetails', function(){
    it('should call render as \'details\'', function(){
      var view = buildEvent(),
          renderSpy = sandbox.spy(view, 'render'),
          argumentsHash = {as: 'details'};

      view.renderDetails();
      var renderedAsDetails = renderSpy.calledWith(argumentsHash);
      
      expect(renderedAsDetails).to.be.true;
    });
    
    it('should trigger \'renderDetails\'', function(){
      var view = buildEvent(),
          triggerSpy = sandbox.spy(view, 'trigger');

      view.renderDetails();
      
      expect(triggerSpy).to.be.calledWith('renderDetails', view);
    });

    it('should add the class \'details\' to the element', function(){
      var model = Doubles.Models.Event(),
          view = buildEvent(model);

      view.renderDetails();

      expect(view.$el).to.have.class('details');
    });
  });

  describe('.triggerAddResource', function(){
    it('should trigger \'addResource\' on itself and pass itself', function(){
      var view = buildEvent(),
          spy = sandbox.spy();

      view.on('addResource', spy);
      view.triggerAddResource();

      expect(spy).to.have.been.calledWith(view);
    });
  });
});
