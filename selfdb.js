Model = {};
Collections = {};


Fields = new Mongo.Collection("fields");
Collections.Fields = Fields;
Model.Fields = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  type: {
    type: String,
    label: "type"
  },
  label: {
    type: String,
    label: "label"
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
});



Schemas = new Mongo.Collection("schemas");
Collections.Schemas = Schemas;
Model.Schemas = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  fields: {
    type: [String],
    label: "Fields"
  },
  createdAt: {
    type: Date,
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
