Router.map(function () {
  this.route('hello', {
    path: '/' // match the root path
  });

  this.route('Samples');

  this.route('fields');

  this.route('tablefields', {
    path: '/tf' // match the root path
  });

});

