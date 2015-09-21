describe('models/event', function(){

  if (!App.Models.Resource) {
    App.Models.Resource = Backbone.Model.extend();
  }
  describe('.get("attribute")', function(){
    it('should return the attribute\'s value', function(){
      var event = new App.Models.Event({name: 'Sample Event'});

      var eventName = event.get('name');
      
      expect(eventName).to.equal('Sample Event');
    });
  });

  describe('.resources', function(){
    it('should be an array', function(){
      var event = new App.Models.Event();

      expect(event.attributes.resources).to.be.instanceOf(Array);
    });
  });

  describe('.constructor', function(){
    it('should set all non-resource attributes as normal', function(){
      var event = new App.Models.Event({name: 'some event'}); 

      expect(event.get('name')).to.equal('some event');
    });

    it('should set start date to a date object', function(){
      var event = new App.Models.Event({start_date: '1/2/2015'}); 

      expect(event.get('start_date')).to.be.instanceOf(Date);
    });

    it('should set end date to a date object', function(){
      var event = new App.Models.Event({end_date: '1/2/2015'}); 

      expect(event.get('end_date')).to.be.instanceOf(Date);
    });

    it('should convert any resources to Resource objects', function(){
      var event = new App.Models.Event({resources: [{}]});

      expect(event.get('resources')[0]).to.be.instanceOf(App.Models.Resource);
    });
  });

  describe('addResource', function(){
    it('should add the resource to the resources array', function(){
      var event = new App.Models.Event(),
          resource = Doubles.Models.Resource();

      event.addResource(resource);

      expect(event.attributes.resources).to.include(resource);
    });

    it('should trigger change', function(){
      var event = new App.Models.Event(),
          resource = Doubles.Models.Resource(),
          spy = sandbox.spy();

      event.on('change', spy);
      event.addResource(resource);

      expect(spy).to.have.been.called;
    });
  });

  describe('.stringifiedStartDate', function(){
    it('should return the start date of the event as a string', function(){
      var event = new App.Models.Event({start_date: '1/1/1640'});
      
      expect(event.stringifiedStartDate()).to.deep.equal('1/1/1640');
    });
  });

  describe('.stringifiedEndDate', function(){
    it('should return the end date of the event as a string', function(){
      var event = new App.Models.Event({end_date: '1/1/1640'});
      
      expect(event.stringifiedEndDate()).to.deep.equal('1/1/1640');
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

    describe('With an end_date that precedes the start_date', function(){
      it('should not be valid', function(){
        var event = new App.Models.Event({
          start_date: '1/2/2015',
          end_date: '1/1/2015'
        }); 

        expect(event.isValid()).to.be.false
      });
    });
  });
});
