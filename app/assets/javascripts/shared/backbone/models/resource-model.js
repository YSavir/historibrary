App.Models.Resource = Backbone.Model.extend({

  sourceName: function(){
    return this.get('source_url').match(/(?:https?:\/\/)?(?:www\.)(.*)(\.com|\.net|\.org)/)[1];
  }

});
