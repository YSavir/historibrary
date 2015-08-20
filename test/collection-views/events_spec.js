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
      var coll = Doubles.Collections.Event({models: 2});
      var collView = new App.CollectionViews.Event({collection: coll});

      expect(collView.render()).to.eql(collView);
    });

    it('should apply the template to the $el', function(){
      var collection = Doubles.Collections.Event();
      var collView = new App.CollectionViews.Event({collection: collection});
      var templateStub = Stubs.Templates.EventsList();
      templateStub.returns(TemplateStrings.eventList);
      
      collView.render();

      expect(collView.$el.html()).to.equal(TemplateStrings.eventList);
    });

    it('should call .renderSubViews', function(){
      var coll = Doubles.Collections.Event({models: 2});
      var collView = new App.CollectionViews.Event({collection: coll});
      var renderSubViewsSpy = sandbox.spy(collView, 'renderSubViews');

      collView.render();

      expect(renderSubViewsSpy.called).to.be.true;

    });
  });

  describe('.renderSubViews', function(){

    it('should clear the ul before adding elements', function(){
      var coll = Doubles.Collections.Event(),
          collView = new App.CollectionViews.Event({collection: coll});

      collView.$el.find('ul').append("<li>Food</li><li>Bar</li>");
      collView.renderSubViews();
      var ulElements = collView.$el.find('ul').children();

      expect(ulElements).to.have.lengthOf(0);
    });

    describe('with a collection with 3 models', function(){
      it('should have 3 elements in its ul', function(){
        var collection = Doubles.Collections.Event({models: 3}),
            collView = new App.CollectionViews.Event({collection: collection}),
            templateStub = Stubs.Templates.EventsList();
        templateStub.returns(TemplateStrings.eventList);

        // Set Up Views Templating
        var viewTemplateStub = sandbox.stub(App.Views.Event.prototype, '_template');
        viewTemplateStub.returns(TemplateStrings.eventSummary);
        
        collView.renderSubViews();
        var ulElements = collView.$el.find('ul').children();

        expect(ulElements).to.have.lengthOf(3);
      });
    }); 
  });
});
