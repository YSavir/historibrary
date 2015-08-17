describe('collection-views/events', function(){
  afterEach(function(){
    sandbox.restore();
  });

  describe('.$el', function(){
    it('should return the .events.content element', function(){
      var collView = new App.CollectionViews.Event();

      var expectedElement = $('.events.content');

      //compare nodes since jquery notes are inherently different
      expect(collView.$el[0]).to.equal(expectedElement[0]);
    });
  });

  describe('.render', function(){
    it('should return the collection view', function(){
      var coll = mocks.collections.event({models: 2});
      var collView = new App.CollectionViews.Event({collection: coll});

      expect(collView.render()).to.eql(collView);
    });

    it('should apply the template to the $el', function(){
      var collection = mocks.collections.event();
      var collView = new App.CollectionViews.Event({collection: collection});
      var templateStub = stubs.templates.eventsList();
      templateStub.returns(templateStrings.eventList);
      
      collView.render();

      expect(collView.$el.html()).to.equal(templateStrings.eventList);
    });

    it('should call .renderSubViews', function(){
      var coll = mocks.collections.event({models: 2});
      var collView = new App.CollectionViews.Event({collection: coll});
      // var renderSubViewStub = sinon.stub(collView, 'renderSubViews');
      var renderSubViewsSpy = sinon.spy(collView, 'renderSubViews');

      collView.render();

      expect(renderSubViewsSpy.called).to.be.true;

    });
  });

  describe('.renderSubViews', function(){

    it('should clear the ul before adding elements', function(){
      var coll = mocks.collections.event(),
          collView = new App.CollectionViews.Event({collection: coll});

      collView.$el.find('ul').append("<li>Food</li><li>Bar</li>");
      collView.renderSubViews();
      var ulElements = collView.$el.find('ul').children();

      expect(ulElements).to.have.lengthOf(0);
    });

    describe('with a collection with 3 models', function(){
      it('should have 3 elements in its ul', function(){
        var collection = mocks.collections.event({models: 3}),
            collView = new App.CollectionViews.Event({collection: collection}),
            templateStub = stubs.templates.eventsList();
        templateStub.returns(templateStrings.eventList);

        // Set Up Views Templating
        var viewTemplateStub = sinon.stub(App.Views.Event.prototype, '_template');
        viewTemplateStub.returns(templateStrings.eventSummary);
        
        collView.renderSubViews();
        var ulElements = collView.$el.find('ul').children();

        expect(ulElements).to.have.lengthOf(3);
      });
    }); 
  });
});
