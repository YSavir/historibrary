window.expect = chai.expect;
window.sandbox = sinon.sandbox.create();
window.HandlebarsTemplates = {};

chai.config.showDiff = true;

window.Doubles = {
  Models: {},
  Collections: {},
  Views: {}
},

window.Stubs = {
  Templates: {}
};

window.Factory = {};

