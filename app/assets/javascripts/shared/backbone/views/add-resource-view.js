App.Views.AddResource = Backbone.View.extend({

  className: 'modul add-resource-modul',

  initialize: function(){
    this.render();
    this.appendToBody();
  },
  
  render: function(){
    this.$el.html(this._template());
    return this;
  },

  events: {
    'click .submit-resource': 'submitResource'
  },

  _template: function(){
    return HandlebarsTemplates['add-resource']();
  },

  appendToBody: function(){
    $('body').append(this.$el);
  },

  submitResource: function(){
    var form = this.$el.find('form')[0],
        values = {
          name: form['resource[name]'].value,
          summary: form['resource[summary]'].value,
          source_url: form['resource[source_url]'].value
        };

    this.model.createResource(values);
    this.$el.find('form input[type=text]').each(function(idx, input){
      $(input).val('');
    });
  }
});
