SelfDB = {
	exists : function() {
		console.log("Exists Collection.");
		console.log(Template.currentData());
		if (Collections[Template.currentData().collection]){
			return true;
		}
		return false;
	},

	existsModel : function() {
		console.log("Exists Model.");
		console.log(Template.currentData());
		if (Model[Template.currentData().collection]){
			return true;
		}
		return false;
	},

	schemaKeys : function() {
		console.log("Schema keys.");
		if (Model[Template.currentData().collection]){
			console.log("Getting Schema keys");
			var res = Model[Template.currentData().collection]._schemaKeys;
			console.log(res);
			return res;
		}
		console.log("Model does not exist.");
	},

	modelRows : function() {
		console.log("Model rows");
		if (Model[this.collection]){
			var coll = Collections[Template.currentData().collection];
			console.log("Getting Schema keys");
			var keys = Model[Template.currentData().collection]._schemaKeys;
			console.log(keys);
			console.log("Getting Model rows");
			var rows = coll.find({}, {}).fetch();
			console.log(rows);
			_.each(rows,
				function(row){
					console.log("Getting a model row");
					console.log(row);
					row["fields"]=_.map(keys,
						function(key){
						return row[key];
					});
    	    });
    console.log(rows);
    return rows;
  }
  console.log("Collection does not exist.");
}

}
Template.registerHelper('exists', SelfDB.exists);
Template.registerHelper('existsModel', SelfDB.existsModel);
Template.registerHelper('schemaKeys', SelfDB.schemaKeys);
Template.registerHelper('modelRows', SelfDB.modelRows);

