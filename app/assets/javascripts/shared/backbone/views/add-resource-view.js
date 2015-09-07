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
    'submit form': 'submitResource'
  },

  _template: function(){
    return HandlebarsTemplates['add-resource']();
  },

  appendToBody: function(){
    $('.modul').each(function(idx, el){
      $(el).remove();
    });
    $('body').append(this.$el);
  },

  submitResource: function(e){
    var form = this.$el.find('form')[0],
        values = {
          name: form['resource[name]'].value,
          summary: form['resource[summary]'].value,
          source_url: form['resource[source_url]'].value
        };

    this.preventEvent(e);
    this.model.createResource(values);
    this.$el.find('form input[type=text]').each(function(idx, input){
      $(input).val('');
    });
  },

  preventEvent: function(e){
    e.preventDefault();
  }
});
