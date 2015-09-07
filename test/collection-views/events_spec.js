describe('collection-views/events', function(){
  afterEach(function(){
    sandbox.restore();
    $('.events.content').empty();
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

  describe('renderSubView', function(){
    it('should add the subView to .views', function(){
      var collView = new App.CollectionViews.Event(),
          view = new Doubles.Views.Event();

      collView.renderSubView(view);

      expect(collView.views).to.include(view);
    });

    it('should render the view', function(){
      var collView = new App.CollectionViews.Event(),
          view = Doubles.Views.Event(),
          subViewRenderSpy = sandbox.spy(view, 'render');
      
      collView.renderSubView(view);

      expect(subViewRenderSpy).to.have.been.called;
    });

    it('should listen to the view\'s renderDetails event', function(){
      var collView = new App.CollectionViews.Event(),
          view = Doubles.Views.Event(),
          listenerSpy = sandbox.spy(collView, 'collapseInactiveViews');

      collView.renderSubView(view);
      view.trigger('renderDetails', view);

      expect(listenerSpy).to.have.been.calledWith(view);
    });

    it ('should listen to the view\'s addResource event', function(){
      var collView = new App.CollectionViews.Event(),
          view = Doubles.Views.Event(),
          listenerSpy = sandbox.spy(collView, 'newResourceForEvent');
      
      collView.renderSubView(view);
      view.trigger('addResource', view);

      expect(listenerSpy).to.have.been.calledWith(view);
    });

    it('should append the sub view\s $el to its ul', function(){
      var collView = new App.CollectionViews.Event(),
          view = Doubles.Views.Event();

      
      collView.$el.append('<ul></ul>');
      collView.renderSubView(view);

      expect(collView.$el.find('ul').children().last()[0]).to.eql(view.$el[0]);
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

    it('should render a sub view for each of the collection\'s models', function(){
      var coll = Doubles.Collections.Event({models: 3}),
          collView = new App.CollectionViews.Event({collection: coll}),
          renderSubViewSpy = sandbox.spy(collView, 'renderSubView');

      collView.renderSubViews();

      expect(renderSubViewSpy).to.have.been.calledThrice;
    });
  });
});
