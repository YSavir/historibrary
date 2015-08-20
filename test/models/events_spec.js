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

  describe('dateRange', function(){
    describe('When the end date and start date differ', function(){
      it('should return start and end dates separated by dash', function(){
        var event = new App.Models.Event({
              start_date: '1/1/1640',
              end_date: '1/2/1640'
            }),
            otherEvent = new App.Models.Event({
              start_date: '1/1/1640',
              end_date: '1/3/1640'
            });

        expect(event.dateRange()).to.equal('1/1/1640 - 1/2/1640');
        expect(otherEvent.dateRange()).to.equal('1/1/1640 - 1/3/1640');
      });
    });

    describe('When the end date and the start date are the same', function(){
      it('should return a string of the single date', function(){
        var event = new App.Models.Event({
              start_date: '1/1/1640',
              end_date: '1/1/1640'
            });

        expect(event.dateRange()).to.equal('1/1/1640');
      });
    });
  });
});
