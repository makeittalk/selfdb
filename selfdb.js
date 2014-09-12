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
    return true; // no cowboy inserts -- use createParty method
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
    return true; // no cowboy inserts -- use createParty method
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});



if (Meteor.isClient) {

  Meteor.subscribe("fields");

  Meteor.subscribe("schemas");

  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set("counter", Session.get("counter") + 1);
    }
  });

  Template.Fields.fields = function () {
    return Fields.find({}, {sort: {name: 1}});
  };

  Template.Schemas.schemas = function () {
    return Schemas.find({}, {sort: {name: 1}});
  };

}

if (Meteor.isServer) {

  Meteor.publish("fields", function () {
  return Fields.find({}, {});
  });

  Meteor.publish("schemas", function () {
  return Schemas.find({}, {});
  });

  

  Meteor.startup(function () {
    
    if (Fields.find().count() === 0) {
      var names = [
      {name: "name", type:"String", label: "Name"},
      {name: "type", type:"String", label: "Type"},
      {name: "label", type:"String", label: "Label"},
      {name: "fields", type:"[String]", label: "fields"},
      {name: "createdAt", type:"Date", label: "Created Date"}

      ];
      for (var i = 0; i < names.length; i++)
        Fields.insert(names[i]);
    }

    if (Schemas.find().count() === 0) {
      var names = [
      {name: "Fields", fields:["name", "type", "label"]},
      {name: "Schemas", fields:["name", "fields","createdAt"]}
      ];
      for (var i = 0; i < names.length; i++)
        Schemas.insert(names[i]);
    }

  });
}
