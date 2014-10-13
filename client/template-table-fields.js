Template.tablefields.fields = function () {
     var fieldList = Fields.find({}, {sort: {name: 1}}).fetch();
     console.log(fieldList);
     var res = _.map(fieldList,
          convertToArray
          );
     Template.tablefields.fieldProperties = res[0].fieldProperties;
     return res;
};

function convertToArray(object){
	var res=[];
     var fields={};
	_.each(Object.getOwnPropertyNames(object),
     	function(val){
     		var ob = {};
     		ob["name"]=val;
     		ob["value"]=object[val];
     		res.push(ob);
               if(!fields[val]){
                    fields[val]=0;
               }
     	});
	var resp = {};
	resp["fieldDescription"] = res;
     resp["fieldProperties"] = Object.getOwnPropertyNames(fields);
	return resp;
}

