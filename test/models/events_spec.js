describe('models/event', function(){
  describe('name', function(){
    it('should return the name of the event', function(){
      var event = new App.Models.Event({name: 'Sample Event'});

      var eventName = event.get('name');
      
      expect(eventName).to.equal('Sample Event');
    });
  });

  describe('start_date', function(){
      it('should return the start date of the event', function(){
        var event = new App.Models.Event({start_date: '1/1/1640'});

        var eventName = event.get('start_date');
        
        expect(eventName).to.equal('1/1/1640');
      });
    });
});
