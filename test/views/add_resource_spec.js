describe('views/add-resource', function(){

  var renderFillAndSubmitNewResourceForm = function(view){
    view.render();
    $('input[name="resource[name]"]').val('namefoo');
    $('input[name="resource[summary]"]').val('summaryfoo');
    $('input[name="resource[source_url]"]').val('sourcefoo');
    view.submitResource({preventDefault: function(){}});
  };

  var buildView = function(model, coll){
    model = model || Doubles.Models.Event();
    coll = coll || buildResourceCollection();

    return new App.Views.AddResource({model: model, collection: coll});
  }

  var buildResourceCollection = function(){
    return new ( Backbone.Collection.extend({
      createResourceForEvent: function(){}
    }) );
  };

  afterEach(function(){
    sandbox.restore();
    $('.add-resource-modul').remove();
  });

  itShouldBehaveAsBackboneView(buildView(), {
    templates: ['add-resource']
  });

  describe('el', function(){
    it('should be a div', function(){
          var view = buildView(),
          tagName = view.el.tagName.toLowerCase();


      expect(tagName).to.equal('div');
    });

    it('should have the classes modul and add-resource-modul', function(){
      var view = buildView();
        
      expect(view.el.className).to.equal('modul add-resource-modul');
    });
  });

  describe('render', function(){
    it('should append its $el to the body', function(){
      var view = buildView();

      view.render();

      expect($('.modul')[0]).to.exist;
    });
  });

  describe('.clearModuls', function(){
    it('should clear all moduls', function(){
      var view = buildView();

      for(var i = 0; i < 2; i++) {
        $('body').append('<div class="modul"></div>');
      }
    
      view.clearModuls();

      expect($('.modul')).to.have.lengthOf(0);
    });
  });

  describe('.clearModulsAndRender', function(){
    it('should call .clearModuls', function(){
      var view = buildView(),
          clearSpy = sandbox.spy(view, 'clearModuls');

      view.clearModulsAndRender();

      expect(clearSpy).to.have.been.called;
    });

    it('should call .render', function(){
      var view = buildView(),
          renderSpy = sandbox.spy(view, 'render');

      view.clearModulsAndRender();

      expect(renderSpy).to.have.been.called;
    });
  });

  describe('events', function(){
    describe('submit form', function(){
      it('should be set to submitResource', function(){
        var view = buildView();

        expect(view.events['submit form']).to.equal('submitResource');
      });
    });
  });

  describe('submitResource', function(){
    it('should pass the resource data to the resource collection', function(){
      var view = buildView(),
          createResourceStub = sandbox.stub(view.collection, 'createResourceForEvent');

      renderFillAndSubmitNewResourceForm(view);
      
      expect(createResourceStub).to.have.been.calledWith(view.model, {
        name: 'namefoo',
        summary: 'summaryfoo',
        source_url: 'sourcefoo'
      });
    });

    it('should prevent default', function(){
      var view = buildView(),
          preventSpy = sandbox.stub(view, 'preventEvent');


      renderFillAndSubmitNewResourceForm(view);

      expect(preventSpy).to.have.been.called;
    });

    describe('and the resource submits successfully', function(){
      it('should remove the modul', function(){
        var view = buildView(),
            createResourceStub = sandbox.stub(view.collection, 'createResourceForEvent');

        renderFillAndSubmitNewResourceForm(view);
        var modul = document.getElementsByClassName('.modul.add-resource-modul');

        expect(modul).to.be.empty;
      });
    });
  });

  describe('.preventEvent', function(){
    it('should prevent the given event', function(){
      var view = buildView(),
          e = {preventDefault: function(){}},
          preventSpy = sandbox.spy(e, 'preventDefault');

      view.preventEvent(e);

      expect(preventSpy).to.have.been.called;
    });
  });
});
