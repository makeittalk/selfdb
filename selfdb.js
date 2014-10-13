Model = {};
Collections = {};


Fields = new Mongo.Collection("fields");
/*Collections.Fields = Fields;
Model.Fields = new SimpleSchema({
    _id: {
    type: "String",
    label: "Id"
  },
  name: {
    type: "String",
    label: "Name"
  },
  type: {
    type: "String",
    label: "type"
  },
  label: {
    type: "String",
    label: "label"
  },
  createdAt: {
    type: "Date",
    label: "Created At"
  }
});
Fields.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});*/
//Load Schemas
Meteor.startup(function () {
  console.log('Schemas startup');
  var all = Schemas.find().fetch();
  var currentSchema=all[0];
  var fieldNames = currentSchema.fields;
  var fields = _.map(fieldNames,
    function(key){
      return Fields.findOne({name:key});
    });
  var parts = _.each(fields,
    function(key){
      delete key.name;
      delete key._id;
    });
  
  console.log('Getting first simpleSchemas');
  
  var schema = _.object(fieldNames,fields);

  console.log(schema);

  Collections.Fields = Fields;
  Model.Fields = new SimpleSchema(schema);
});




Schemas = new Mongo.Collection("schemas");
Collections.Schemas = Schemas;
Model.Schemas = new SimpleSchema({
    _id: {
    type: "String",
    label: "Id"
  },
  name: {
    type: "String",
    label: "Name"
  },
  fields: {
    type: "[String]",
    label: "Fields"
  },
  createdAt: {
    type: "Date",
    label: "Created at"
  }
});
Schemas.allow({
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



if (Meteor.isClient) {
}

if (Meteor.isServer) {
  
}
