_Fields = new Mongo.Collection("Fields");
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

_Schemas = new Mongo.Collection("Schemas");
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

  determineContextParam : function(name){
    if (name){
      return name;
    }
    else{
      return Template.currentData().collection;
    }
  },

  exists : function(name) {
    var collName = SelfDB.determineContextParam();
    console.log("Exists Collection "+ collName+"?");
    
    if (SelfDB.Collections[collName]){
      console.log(collName + " Collection Exists.");
      return true;
    }
    console.log(collName + " Collection does NOT Exist.");
    console.log([SelfDB.Model,SelfDB.Collections]);
    return false;
  },

  existsModel : function(name) {
    var collName = SelfDB.determineContextParam();
    console.log("Exists Model "+ collName+"?");
    console.log(collName + " Model Exists.");
    console.log(collName);
    if (SelfDB.Model[collName]){
      console.log(collName + " Model Exists.");
      return true;
    }
    console.log(collName + " Model does NOT Exist.");
    return false;
  },

  schemaKeys : function(name) {
    var collName = SelfDB.determineContextParam();
    console.log("Schema keys for "+ collName);
    if (SelfDB.Model[collName]){
      console.log("Getting Schema keys"+ collName);
      var res = SelfDB.Model[collName]._schemaKeys;
      console.log(res);
      return res;
    }
    console.log("Model does not exist.");
  },

  modelRows : function(name) {
    var collName = SelfDB.determineContextParam();
    console.log("Model rows for "+ collName);
    if (SelfDB.Model[collName]){
      var coll = SelfDB.Collections[collName];
      console.log("Getting Schema keys for "+ collName);
      var keys = SelfDB.Model[collName]._schemaKeys;
      console.log(keys);
      console.log("Getting Model rows for "+ collName);
      var rows = coll.find({}, {}).fetch();
      console.log(rows);
      _.each(rows,
        function(row){
          console.log("Getting a model row for "+ collName);
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
    var all = SelfDB.SchemasMC.find({},{}).fetch();
    console.log("Schemas found: "+all.length);
    if (all.length==0){
      console.log("**No Schemas found**");
      return;
    }
    for(var i=0;i<all.length;i++){
      var currentSchema = all[i];
      var schemaName = currentSchema.name;
      console.log('Current Schema: '+ schemaName);
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

      console.log("Schema " + schemaName + ":" + schema);

      if (schemaName==="Fields"){
        SelfDB.Collections[schemaName] = SelfDB.FieldsMC;
      } else
      if (schemaName==="Schemas"){
        SelfDB.Collections[schemaName] = SelfDB.SchemasMC;
      } else {
        if(!SelfDB.Collections[schemaName]){
          SelfDB.Collections[schemaName] = new Mongo.Collection(schemaName);
        }
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
    
    if (SelfDB.FieldsMC.find({},{}).count() === 0) {
      
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

    if (SelfDB.SchemasMC.find({},{}).count() === 0) {
      var names = [
      {name: "Fields", fields:["_id","name", "type", "label","createdAt"]},
      {name: "Schemas", fields:["_id","type","name", "fields","createdAt"]}
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
    console.log("Dashboard template created.")
  };
  Template.dashboard.helpers({
    isReady : function(){
      console.log("Calling isReady.");
      return Session.get("dashboard.waitOn");
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("Fields", function () {
    return _Fields.find({}, {});
  });

  Meteor.publish("Schemas", function () {
    return _Schemas.find({}, {});
  });

  SelfDB.ifEmptyPopulate();

  console.log('====Loading Schemas====');
  SelfDB.loadSchemas();
  console.log('----Schemas loaded----');
  var schemas = _Schemas.find().fetch();
  for(var i=0;i<schemas.length;i++){
    var currentSchema = schemas[i];
    var schemaName = currentSchema.name;
    if (schemaName==="Fields"){
        SelfDB.Collections[schemaName] = SelfDB.FieldsMC;
      } else
      if (schemaName==="Schemas"){
        SelfDB.Collections[schemaName] = SelfDB.SchemasMC;
      } else {
        if(!SelfDB.Collections[schemaName]){
              var coll = new Mongo.Collection(schemaName);
              coll.allow({
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
              Meteor.publish(schemaName, function () {
                return coll.find({}, {});
              });
            }
          }

    console.log("Publishing "+schemaName+" collection.");
  }  
}
