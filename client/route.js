Router.configure({
  loadingTemplate : 'loading',
  onBeforeAction : function (pause) {
            if (!Meteor.user()) {
            // render the login template but keep the url in the browser the same
            this.render('login');
        }
      }
});

Router.map(function () {



  this.route('login', {
    path: '/' // match the root path
  });

  this.route('Samples');

  this.route('fields');

  this.route('tablefields', {
    path: '/tf' // match the root path
  });

  this.route('dashboard',{
    waitOn: function(){
      Session.set("dashboard.waitOn",true);
      console.log("Started to wait on Subscription.");
      var _handleSchema = Meteor.subscribe("Schemas", function(){
        Session.set("dashboard.waitOn.schemas",false);
        console.log("Subscription for Schemas ready.");
      });
      var _handleFields = Meteor.subscribe("Fields", function(){
        Session.set("dashboard.waitOn.fields",false);
        console.log("Subscription Fields ready.");
      });



      readyFunction = function(){
        var res = (_handleFields.ready()&&_handleSchema.ready());
        if (res){
          Session.set("dashboard.waitOn",false);
        }
        console.log("Calling readyFunction: " + res);
        return res;
      };

      //return [_handleSchema,_handleFields];
      return {ready : readyFunction};
    }
  });
  
  this.route('about');
  this.route('contact');

  this.route('collections',{
    path : '/collections/:name',

    data : function(){ 
      var params = this.params;
      var collname = params.name;
      return {collection: collname}
    },

    action: function(){
      console.log("Routing to collections.");

      var params = this.params;
      var collname = params.name;

      console.log('Collections name: '+collname);
      this.render('coll');
    }
  });
});