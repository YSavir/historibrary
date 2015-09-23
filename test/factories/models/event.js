Factory['user'] = function(attrs){
  attrs = attrs || {};
  var defaults = {
        name: 'Some Event',
        summary: 'Default event summary',
        start_date: '1/1/2015',
        end_date: '1/2/2015'
      },
      data = _.extend(defaults, attrs);

  return new App.Models.Event(data);
}
