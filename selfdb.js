_Fields = new Mongo.Collection("fields");
_Fields.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

_Schemas = new Mongo.Collection("schemas");
_Schemas.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});


var FieldsColl = _Fields;
FieldsColl.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

var SchemasColl = _Schemas;
SchemasColl.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});

SelfDB = {
  Model : {},

  Collections : {},

  FieldsMC : FieldsColl,

  SchemasMC : SchemasColl,

  exists : function() {
    console.log("Exists Collection.");
    console.log(Template.currentData().collection);
    if (SelfDB.Collections[Template.currentData().collection]){
      console.log(Template.currentData().collection + " Collection Exists.");
      return true;
    }
      console.log(Template.currentData().collection + " Collection does NOT Exist.");
      console.log([SelfDB.Model,SelfDB.Collections]);
    return false;
  },

  existsModel : function() {
    console.log("Exists Model.");
    console.log(Template.currentData().collection + " Model Exists.");
    console.log(Template.currentData());
    if (SelfDB.Model[Template.currentData().collection]){
      console.log(Template.currentData().collection + " Model Exists.");
      return true;
    }
    console.log(Template.currentData().collection + " Model does NOT Exist.");
    return false;
  },

  schemaKeys : function() {
    console.log("Schema keys.");
    if (SelfDB.Model[Template.currentData().collection]){
      console.log("Getting Schema keys");
      var res = SelfDB.Model[Template.currentData().collection]._schemaKeys;
      console.log(res);
      return res;
    }
    console.log("Model does not exist.");
  },

  modelRows : function() {
    console.log("Model rows");
    if (SelfDB.Model[this.collection]){
      var coll = SelfDB.Collections[Template.currentData().collection];
      console.log("Getting Schema keys");
      var keys = SelfDB.Model[Template.currentData().collection]._schemaKeys;
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
    },

    //Load Schemas
  loadSchemas : function () {
    console.log('Schemas startup');
    var all = SelfDB.SchemasMC.find().fetch();
    console.log("Schemas found: "+all.length);
    if (all.length==0){
      console.log("**No Schemas found**");
      return;
    }
for(var i=0;i<all.length;i++){
    var currentSchema = all[i];
    var schemaName = currentSchema.name;

    console.log('Will work with Schema: '+ schemaName);
    console.log(currentSchema);
    var fieldNames = currentSchema.fields;
    var fields = _.map(fieldNames,
      function(key){
        return SelfDB.FieldsMC.findOne({name:key});
      });
    var parts = _.each(fields,
      function(key){
        delete key.name;
        delete key._id;
      });
     console.log('Getting first simpleSchemas');

     var schema = _.object(fieldNames,fields);

    console.log(schema);

    if (schemaName==="Fields"){
      SelfDB.Collections[schemaName] = SelfDB.FieldsMC;
    } else
    if (schemaName==="Schemas"){
      SelfDB.Collections[schemaName] = SelfDB.SchemasMC;
    } else {
      SelfDB.Collections[schemaName] = new Mongo.Collection(schemaName);
    }

    SelfDB.Model[schemaName] = new SimpleSchema(schema);
    SelfDB.Collections[schemaName].attachSchema(SelfDB.Model.Fields);
      console.log("Collections and Model set.");
      console.log([SelfDB.Model, SelfDB.Collections]);
    }
    },

    registerWithModel : function(name,coll,model){
      if (SelfDB.Model[name]){
        console.log("Model '" + name + 
          "' already registered."+ coll);

      }

      if (SelfDB.Collections[name]){
        console.log("Collection '" + name + 
          "' already registered."+ coll);
      }

      SelfDB.Model[name]=model;
      SelfDB.Collections[name]=coll;
    },

    register : function(name,coll){
      if (SelfDB.Collections[name]){
        console.log("Collection '" + name + 
          "' already registered."+ coll);
      }

      SelfDB.Collections[name]=coll;
    },

    ifEmptyPopulate : function () {
    
    if (SelfDB.FieldsMC.find().count() === 0) {
      
      var names = [
      {name: "_id", type:"String", label: "Id"},
      {name: "name", type:"String", label: "Name"},
      {name: "type", type:"String", label: "Type"},
      {name: "label", type:"String", label: "Label"},
      {name: "fields", type:"[String]", label: "fields"},
      {name: "createdAt", type:"Date", label: "Created Date"}

      ];
      for (var i = 0; i < names.length; i++)
        SelfDB.FieldsMC.insert(names[i]);
    }

    if (SelfDB.SchemasMC.find().count() === 0) {
      var names = [
      {name: "Fields", fields:["_id","name", "type", "label","createdAt"]},
      {name: "Schemas", fields:["_id","name", "fields","createdAt"]}
      ];
      for (var i = 0; i < names.length; i++)
        SelfDB.SchemasMC.insert(names[i]);
    }

  }

};

if (Meteor.isClient){
  Template.registerHelper('exists', SelfDB.exists);
  Template.registerHelper('existsModel', SelfDB.existsModel);
  Template.registerHelper('schemaKeys', SelfDB.schemaKeys);
  Template.registerHelper('modelRows', SelfDB.modelRows);
  Template.registerHelper('loadSchemas', SelfDB.loadSchemas);

  Template.dashboard.created = function(){ 
    SelfDB.loadSchemas();
  };
}

if (Meteor.isServer) {
  SelfDB.ifEmptyPopulate();
}
