$(function(){
  var app = new Vue({
    el: '#events-app',

    data: {
      events: new App.Collections.Event(),
      detailedEvent: null
    },

    computed: {
      eventsByDate:function(){
        return this.events.orderByStartDate().reverse();
      }
    },

    methods: {
      toggleDetails: function(event){
        if ( this.isCurrentEvent(event) ) {
          this.detailedEvent = null;
        } else {
          this.detailedEvent = event;
        };
      },
      isCurrentEvent: function(event){
        return this.detailedEvent === event;
      }
    }
  })
});
