Router.map(function () {
  this.route('hello', {
    path: '/' // match the root path
  });

  this.route('Samples');

  this.route('fields');

  this.route('tablefields', {
    path: '/tf' // match the root path
  });

  this.route('dashboard');
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