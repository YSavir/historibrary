var itShouldBehaveAsBackboneView = function(view, opts){
  opts = opts || {};
  opts.templates = opts.templates || [];

  describe('should behave as a backbone view', function(){
    describe('.render', function(){
      it('should return itself', function(){
        expect(view.render()).to.eql(view);
      });

      opts.templates.forEach(function(template){
        it('should render the ' + template + ' template', function(){
          var templateStub = sandbox.stub(HandlebarsTemplates, template),
              templateName = template.split('/')[1];

          templateStub.returns('template text');
          view.render({as: templateName});

          expect(view.$el.html()).to.equal('template text');
        });
      });
    });
  });
};
