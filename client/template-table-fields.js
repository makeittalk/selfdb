Template.tablefields.fields = function () {
     var fieldList = Fields.find({}, {sort: {name: 1}}).fetch();
     console.log(fieldList);

     return _.map(fieldList,
     	convertToArray
     	);
; 

};

function convertToArray(object){
	var res=[];
	_.each(Object.getOwnPropertyNames(object),
     	function(val){
     		var ob = {};
     		ob["name"]=val;
     		ob["value"]=object[val];
     		res.push(ob);
     	});
	var resp = {};
	resp["fieldDescription"] = res;
	return resp;
}