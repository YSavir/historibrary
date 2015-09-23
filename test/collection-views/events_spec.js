describe('collection-views/events', function(){

  App.Views['AddResource'] = Backbone.View.extend({});

  App.Collections.Resource = Backbone.Collection.extend({
    listenForNewResource: function(){}
  });

  var buildCollView = function(opts){
    opts = opts || {};
    var collection = opts.models ?
                       Doubles.Collections.Event({models: opts.models}) :
                       Doubles.Collections.Event();
    
    return new App.CollectionViews.Event({
      collection: collection,
      session: {}
    });
  };

  afterEach(function(){
    sandbox.restore();
    $('.events.content').empty();
  });

  describe('.initialize', function(){
    it('should have its collection listen to the resource collection for new resources', function(){
      var coll = Doubles.Collections.Event({models: 3}),
          spy = sandbox.spy(coll, 'respondToNewResource'),
          collView = new App.CollectionViews.Event({collection: coll});

      expect(spy).to.have.been.calledWith(collView.resourceCollection);
    });
  });

  describe('.$el', function(){
    it('should return the .events.content element', function(){
      var collView = buildCollView();

      var expectedElement = $('.events.content');

      //compare nodes since jquery nodes are inherently different
      expect(collView.$el[0]).to.equal(expectedElement[0]);
    });
  });

  describe('.resourceCollection', function(){
    it('should be a resource collection', function(){
      var collView = buildCollView();

      expect(collView.resourceCollection).to.be.instanceOf(App.Collections.Resource);
    });
  });

  describe('.render', function(){
    it('should return the collection view', function(){
      var collView = buildCollView({models: 2});

      expect(collView.render()).to.eql(collView);
    });

    it('should apply the template to the $el', function(){
      var collView = buildCollView(),
          templateStub = sandbox.stub(HandlebarsTemplates, 'events/list');
      templateStub.returns('list');
      
      collView.render();

      expect(collView.$el.html()).to.equal('list');
    });

    it('should call .renderSubViews', function(){
      var collView = buildCollView({models: 2}),
          renderSubViewsSpy = sandbox.spy(collView, 'renderSubViews');

      collView.render();

      expect(renderSubViewsSpy.called).to.be.true;
    });
  });

  describe('renderSubView', function(){
    it('should render the view', function(){
      var collView = buildCollView(),
          view = Doubles.Views.Event(),
          subViewRenderSpy = sandbox.spy(view, 'render');
      
      collView.renderSubView(view);

      expect(subViewRenderSpy).to.have.been.called;
    });

    it('should listen to the view\'s renderDetails event', function(){
      var collView = buildCollView(),
          view = Doubles.Views.Event(),
          listenerSpy = sandbox.spy(collView, 'collapseInactiveViews');

      collView.renderSubView(view);
      view.trigger('renderDetails', view);

      expect(listenerSpy).to.have.been.calledWith(view);
    });

    it ('should listen to the view\'s addResource event', function(){
      var collView = buildCollView(),
          view = Doubles.Views.Event(),
          listenerStub = sandbox.stub(collView, 'newResourceForEvent');
      
      collView.renderSubView(view);
      view.trigger('addResource', view);

      expect(listenerStub).to.have.been.calledWith(view);
    });

    it('should append the sub view\s $el to its ul', function(){
      var collView = buildCollView(),
          view = Doubles.Views.Event();

      collView.$el.append('<ul></ul>');
      collView.renderSubView(view);

      expect(collView.$el.find('ul').children().last()[0]).to.eql(view.$el[0]);
    });
  });

  describe('.createSubView', function(){
    it('should create a model using a given model and its session', function(){
      var collView = buildCollView(),
          model = Doubles.Models.Event(),
          newViewStub = sandbox.stub(App.Views, 'Event'),
          args = {model: model, session: collView.session},
          givenArgs;

      collView.createSubView(model);
      givenArgs = newViewStub.args[0][0];

      expect(newViewStub).to.be.called;
      expect(givenArgs).to.deep.equal(args);
    });

    it('should return the new subView', function(){
      var collView = buildCollView(),
          model = Doubles.Models.Event(),
          subView;

      subView = collView.createSubView(model);

      expect(subView).to.be.instanceOf(App.Views.Event);
    });

    it('should add the subView to .views', function(){
      var collView = buildCollView(),
          view;

      view = collView.createSubView(Doubles.Models.Event());

      expect(collView.views).to.include(view);
    });
  });

  describe('.renderSubViews', function(){
    it('should clear the ul before adding elements', function(){
      var collView = buildCollView();

      collView.$el.find('ul').append("<li>Foo</li><li>Bar</li>");
      collView.renderSubViews();
      var ulElements = collView.$el.find('ul').children();

      expect(ulElements).to.have.lengthOf(0);
    });

    it('should get events in order of start date', function(){
      var collView = buildCollView({models: 3}),
          orderSpy = sandbox.spy(collView.collection, 'orderByStartDate');

      collView.renderSubViews();

      expect(orderSpy).to.have.been.called;
    });

    it('should create a sub view for each of the collection\'s models', function(){
      var collView = buildCollView({models: 3}),
          createSubViewSpy = sandbox.spy(collView, 'createSubView');

      collView.renderSubViews();

      expect(createSubViewSpy).to.have.been.calledThrice;
    });

    it('should render a sub view for each of the collection\'s models', function(){
      var collView = buildCollView({models: 3}),
          renderSubViewSpy = sandbox.spy(collView, 'renderSubView');

      collView.renderSubViews();

      expect(renderSubViewSpy).to.have.been.calledThrice;
    });
  });

  describe('.newResourceForEvent', function(){
    it('should instantiate a new addResource view for the given event', function(){
      var collView = buildCollView(),
          view = Doubles.Views.Event(),
          addResourceSpy = sandbox.spy(App.Views, 'AddResource');

      collView.newResourceForEvent(view);

      expect(addResourceSpy).to.have.been.called;
      expect(addResourceSpy.args[0][0]).to.have.property('collection', collView.resourceCollection);
    });

    it('should render the new addResource view', function(){
      var collView = buildCollView(),
          view = Doubles.Views.Event(),
          addResourceRenderSpy = sandbox.spy(App.Views.AddResource.prototype, 'render');

      collView.newResourceForEvent(view);

      expect(addResourceRenderSpy).to.have.been.called;
    });
  });
});
