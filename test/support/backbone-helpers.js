(function(){
  // Tests for varius BB view attributes
  var attrTests = {
    tagName: function(el, tagName){
      expect(el.tagName.toLowerCase()).to.equal(tagName);
    },
    className: function(el, className){
      expect(el.className).to.equal(className);
    }
  };

  
  // Test for el attributes
  chai.Assertion.addMethod('elAttributes', function(attrs){

    // Throw error if not passed an array of attributes
    if (!attrs || Object.prototype.toString.call(attrs) != "[object Object]") {
      throw "Assertion requires el attributes";
    }

    var el = chai.util.flag(this, 'object').el;

    for(var attr in attrs){
      if (Object.keys(attrTests).indexOf(attr) != -1 ) {
        attrTests[attr](el, attrs[attr]);
      }
    };
  });


  // Test for El content
  chai.Assertion.addMethod('content', function(content){
    var $el = chai.util.flag(this, 'object').$el;

    new chai.Assertion($el.html()).to.be.equal(content);
  });
}()); 
