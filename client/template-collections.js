Template.Collections.collections = function () {
  var a = new Array();
  _.forEach(Object.getOwnPropertyNames(Collections),
            function(value){a.push({name: value, 
            	content:function(){
            		Collections[value].attachSchema(Model[value]);
            		return Model[value]._schemaKeys}
            })})
  return a;
};
