describe('views/add-resource', function(){

  var renderFillAndSubmitNewResourceForm = function(view){
    view.render();
    $('input[name="resource[name]"]').val('namefoo');
    $('input[name="resource[summary]"]').val('summaryfoo');
    $('input[name="resource[source_url]"]').val('sourcefoo');
    view.submitResource(eventDouble());
  };

  var eventDouble = function(){
    return {
      preventDefault: function(){}
    };
  };

  var buildResourceCollection = function(){
    return new ( Backbone.Collection.extend({
      createResourceForEvent: function(){}
    }) );
  };

  afterEach(function(){
    sandbox.restore();
    $('.add-resource-modul').remove();
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

    it('should append its $el to the body', function(){
      var view = new App.Views.AddResource();

      view.render();

      expect($('.modul')[0]).to.exist;
    });
  });

  describe('.clearModuls', function(){
    it('should clear all moduls', function(){
      var view = new App.Views.AddResource();
      for(var i = 0; i < 2; i++) {
        $('body').append('<div class="modul"></div>');
      }
    
      view.clearModuls();

      expect($('.modul')).to.have.lengthOf(0);
    });
  });

  describe('.clearModulsAndRender', function(){
    it('should call .clearModuls', function(){
      var view = new App.Views.AddResource(),
          clearSpy = sandbox.spy(view, 'clearModuls');

      view.clearModulsAndRender();

      expect(clearSpy).to.have.been.called;
    });

    it('should call .render', function(){
      var view = new App.Views.AddResource(),
          renderSpy = sandbox.spy(view, 'render');

      view.clearModulsAndRender();

      expect(renderSpy).to.have.been.called;
    });
  });

  describe('events', function(){
    describe('submit form', function(){
      it('should be set to submitResource', function(){
        var view = new App.Views.AddResource();

        expect(view.events['submit form']).to.equal('submitResource');
      });
    });
  });

  describe('submitResource', function(){
    it('should pass the resource data to the resource collection', function(){
      var model = Doubles.Models.Event(),
          coll = buildResourceCollection(),
          view = new App.Views.AddResource({model: model, collection: coll}),
          createResourceStub = sandbox.stub(coll, 'createResourceForEvent');

      renderFillAndSubmitNewResourceForm(view);
      
      expect(createResourceStub).to.have.been.calledWith(model, {
        name: 'namefoo',
        summary: 'summaryfoo',
        source_url: 'sourcefoo'
      });
    });

    it('should prevent default', function(){
      var model = Doubles.Models.Event(),
          coll = buildResourceCollection(),
          view = new App.Views.AddResource({model: model, collection: coll}),
          preventSpy = sandbox.stub(view, 'preventEvent');


      renderFillAndSubmitNewResourceForm(view);

      expect(preventSpy).to.have.been.called;
    });

    describe('and the resource submits successfully', function(){
      it('should remove the modul', function(){
        var model = Doubles.Models.Event(),
            coll = buildResourceCollection(),
            view = new App.Views.AddResource({model: model, collection: coll}),
            createResourceStub = sandbox.stub(coll, 'createResourceForEvent');

        renderFillAndSubmitNewResourceForm(view);
        var modul = document.getElementsByClassName('.modul.add-resource-modul');

        expect(modul).to.be.empty;
      });
    });
  });

  describe('.preventEvent', function(){
    it('should prevent the given event', function(){
      var view = new App.Views.AddResource(), 
          e = {preventDefault: function(){}},
          preventSpy = sandbox.spy(e, 'preventDefault');

      view.preventEvent(e);

      expect(preventSpy).to.have.been.called;
    });
  });
});
