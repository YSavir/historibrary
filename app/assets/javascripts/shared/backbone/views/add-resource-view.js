App.Views.AddResource = Backbone.View.extend({

  className: 'modul add-resource-modul',

  events: {
    'submit form': 'submitResource'
  },

  _template: function(){
    return HandlebarsTemplates['add-resource']();
  },

  render: function(){
    this.$el.html(this._template());
    $('body').append(this.$el);
    return this;
  },

  clearModuls: function(){
    $('.modul').each(function(idx, el){
      $(el).remove();
    });
  },

  clearModulsAndRender: function(){
    this.clearModuls();
    this.render();
  },

  submitResource: function(e){
    var form = this.$el.find('form')[0],
        values = {
          name: form['resource[name]'].value,
          summary: form['resource[summary]'].value,
          source_url: form['resource[source_url]'].value
        };

    this.collection.createResourceForEvent(this.model, values);

    this.preventEvent(e);
    this.$el.find('form input[type=text]').each(function(idx, input){
      $(input).val('');
    });
  },

  preventEvent: function(e){
    e.preventDefault();
  }
});
