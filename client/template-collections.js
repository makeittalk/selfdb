Template.Collections.collections = function () {
  var a = new Array();
  _.forEach(Object.getOwnPropertyNames(Collections),
            function(value){a.push({name: value, content:[1,2,3,4,5]})})
  return a;
};
