describe('templates/add-resource', function(){

  afterEach(function(){
    sandbox.restore();
  });

  it('should render the base HTML for add-resource', function(){
    var model = Doubles.Models.Event(),
        partialStub = sandbox.stub(Handlebars.partials, 'newResourceForm'),
        targetHTML = "<h3>Add a Resource</h3>\n"
                   + "<p>Add a resource for Sample Event</p>\n"
                   + "<form>foo</form>\n";
    partialStub.returns('<form>foo</form>\n');

    expect(HandlebarsTemplates['add-resource'](model.attributes)).to.equal(targetHTML);
  });

});
