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

  afterEach(function(){
    sandbox.restore();
    $('.add-resource-modul').remove();
  });

  describe('.initialize', function(){
    it('should render the view', function(){
      var renderStub = sandbox.stub(App.Views.AddResource.prototype, 'render');
      
      new App.Views.AddResource(),

      expect(renderStub).to.have.been.called;
    });

    it('should append the $el', function(){
      var appendStub = sandbox.stub(App.Views.AddResource.prototype, 'appendToBody');

      new App.Views.AddResource(),

      expect(appendStub).to.have.been.called;
    });
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

  describe('events', function(){
    describe('submit form', function(){
      it('should be set to submitResource', function(){
        var view = new App.Views.AddResource();

        expect(view.events['submit form']).to.equal('submitResource');
      });
    });
  });

  describe('submitResource', function(){
    it('should create resource object with form data', function(){
      var model = Doubles.Models.Event(),
          view = new App.Views.AddResource({model: model}),
          createResourceStub = sandbox.stub(model, 'createResource');

      renderFillAndSubmitNewResourceForm(view);
      
      expect(createResourceStub).to.have.been.calledWith({
        name: 'namefoo',
        summary: 'summaryfoo',
        source_url: 'sourcefoo'
      });
    });

    it('should reset the form', function(){
      var model = Doubles.Models.Event(),
          view = new App.Views.AddResource({model: model}),
          createResourceStub = sandbox.stub(model, 'createResource');

      renderFillAndSubmitNewResourceForm(view);
      var form = view.$el.find('form')[0];
      
      expect(form['resource[name]'].value).to.be.empty;
      expect(form['resource[summary]'].value).to.be.empty;
      expect(form['resource[source_url]'].value).to.be.empty;
      expect(view.$el.find('form input[type=submit]').val()).to.equal('Submit Resource');
    });

    it('should prevent default', function(){
      var model = Doubles.Models.Event(),
          view = new App.Views.AddResource({model: model}),
          preventSpy = sandbox.stub(view, 'preventEvent');


      renderFillAndSubmitNewResourceForm(view);

      expect(preventSpy).to.have.been.called;
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

  describe('.appendToBody', function(){
    it('should prepend the $el to the page', function(){
      var view = new App.Views.AddResource({});

      view.appendToBody();

      expect($('div.add-resource-modul')[0]).to.equal(view.$el[0]);
    });

    it('should clear any existing moduls', function(){
      var view = new App.Views.AddResource(),
          otherView = new App.Views.AddResource();

      view.appendToBody();
      otherView.appendToBody();

      expect($('.modul')).to.have.lengthOf(1);
    });
  });
});
