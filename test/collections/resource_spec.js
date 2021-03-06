describe('collections/resource', function(){
  var server;

  beforeEach(function(){
    server = sinon.fakeServer.create();
    // server.respondImmediately = true;
    // sinon.xhr.supportsCORS = true;
  });

  afterEach(function(){
    sandbox.restore();
    server.restore();
    App.Collections.Resource.prototype._eventResources = {};
  });

  describe('.model', function(){
    it('should be the Resource model', function(){
      var collection = new App.Collections.Resource();

      expect(collection.model).to.eql(App.Models.Resource);
    });
  });

  describe('resourcesForEvent', function(){

    describe('for an event that has all existing resources', function(){
      it('should return the resources for that event', function(){
        var event = Doubles.Models.Event({id: 1}),
            coll = new App.Collections.Resource(),
            expectedResources = [];

        for(var i = 1; i < 4; i++){
          var rsrc = coll.add({id: i});
          coll._addResourceForEvent(event, rsrc);
          expectedResources.push(rsrc);
        }

        expect(coll.resourcesForEvent(event)).to.have.members(expectedResources);
      });
    });

    describe('for an event that only has some of the existing resources', function(){
      it('should return the resources for the given event', function(){
        var event = Doubles.Models.Event({id: 1}),
            coll = new App.Collections.Resource(),
            expectedResources = [];

        for(var i = 1; i < 6; i++){
          var rsrc = coll.add({id: i});
          
          if (i < 4) {
            coll._addResourceForEvent(event, rsrc);
            expectedResources.push(rsrc);
          }
        }

        expect(coll.resourcesForEvent(event)).to.have.members(expectedResources);
      });
    });
  });

  describe('.fetchForEvent', function(){
    it('should make an AJAX call for the resources for a given event', function(){
      var event = Doubles.Models.Event({id: 1}),
          coll = new App.Collections.Resource(),
          apiURL = '/api/v1/resources?event_id=1';

      coll.fetchForEvent(event);                                 
      var request = server.requests[0];

      expect(request).to.have.property('method', 'GET');
      expect(request.requestHeaders).to.have.property('Content-Type', 'JSON');
      expect(request).to.have.property('url', apiURL);
    });

    it('should trigger coll.addResourcesToEvent passing response data', function(){
      var event = Doubles.Models.Event({id: 1}),
          coll = new App.Collections.Resource(),
          apiURL = '/api/v1/resources?event_id=1',
          addStub = sandbox.stub(coll, 'addResourcesFromResponse'),
          resources = [
            Doubles.Models.Resource({id: 1}).attributes,
            Doubles.Models.Resource({id: 2}).attributes,
            Doubles.Models.Resource({id: 3}).attributes
          ];

      server.respondWith('GET', apiURL, [
        200,
        {'Content-Type': 'application/json'},
        JSON.stringify(resources)
      ]);

      coll.fetchForEvent(event);
      server.respond();
      
      expect(addStub).to.have.been.calledWith(resources, event);
    });
  });

  describe('.addResourcesFromResponse', function(){
    describe('when adding a new resource', function(){
      it('should add the given resources', function(){
        var event = Doubles.Models.Event({id: 1}),
            coll = new App.Collections.Resource(),
            addSpy = sandbox.spy(coll, 'add'),
            resources = [
              Doubles.Models.Resource({id: 1}),
              Doubles.Models.Resource({id: 2}),
              Doubles.Models.Resource({id: 3})
            ];
       
        coll.addResourcesFromResponse(resources, event);

        resources.forEach(function(resource){
          expect(addSpy).to.have.been.calledWith(resource);
        });
      });

      describe('when adding all new resources to an event', function(){
        it('should add all the resources to the event', function(){
          var event = Doubles.Models.Event({id: 1}),
              coll = new App.Collections.Resource(),
              resources = [
                Doubles.Models.Resource({id: 1}),
                Doubles.Models.Resource({id: 2}),
                Doubles.Models.Resource({id: 3})
              ];

          coll.addResourcesFromResponse(resources, event);

          expect(event.attributes.resources).to.have.lengthOf(3);
        });
      });
    });
  });

  describe('createResourceForEvent', function(){
    it('should make an API request to create the resource for the event', function(){
      var event = Doubles.Models.Event({id: 1}),
          coll = new App.Collections.Resource(),
          apiURL = '/api/v1/resources',
          resourceData = {
            name: 'Some Resource',
            summary: 'Some Resources Summary',
            source_url: 'some.url.com.'
          },
          requestBody = $.param({event_id: event.get('id'), resource: resourceData});
          
      coll.createResourceForEvent(event, resourceData);
      var request = server.requests[0];

      expect(request).to.have.property('url', apiURL);
      expect(request).to.have.property('method', 'POST');
      expect(request).to.have.property('requestBody', requestBody);
      // TODO: find way to test 'dataType' (may require stubbing $.ajax)
      // expect(request.requestHeaders).to.have.property('dataType', 'JSON');
    });

    it('should add the returned resource to the event', function(){
      var event = Doubles.Models.Event({id: 1}),
          coll = new App.Collections.Resource(),
          apiURL = '/api/v1/resources',
          resourceData = {
            name: 'Some Resource',
            summary: 'Some Resources Summary',
            source_url: 'some.url.com.'
          },
          returnedResource =  _.clone(resourceData),
          addStub = sandbox.stub(event, 'addResource');
      returnedResource['id'] = 1;

      server.respondWith('POST', apiURL, [
        201,
        {'Content-Type': 'application/json'},
        JSON.stringify(returnedResource)
      ]);

      coll.createResourceForEvent(event, resourceData);
      server.respond();

      expect(addStub).to.have.been.called;
    });
  });
});

