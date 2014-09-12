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

Template.__checkName("hello");
Template["hello"] = new Template("Template.hello", (function() {
  var view = this;
  return [ HTML.Raw("<button>Click Me</button>\n  "), HTML.P("You've pressed the button ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("counter"));
  }), " times.") ];
}));

Template.__checkName("Fields");
Template["Fields"] = new Template("Template.Fields", (function() {
  var view = this;
  return [ HTML.Raw("<h1>Fields</h1>\n  "), HTML.P("\n    ", HTML.UL("\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("fields"));
  }, function() {
    return [ "\n        ", HTML.LI(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("name"));
    }), ",", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("type"));
    }), ",", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("label"));
    })), "\n      " ];
  }), "\n    "), "\n  ") ];
}));

Template.__checkName("Schemas");
Template["Schemas"] = new Template("Template.Schemas", (function() {
  var view = this;
  return [ HTML.Raw("<h1>Schemas</h1>\n  "), HTML.P("\n   ", HTML.UL("\n      ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("schemas"));
  }, function() {
    return [ "\n        ", HTML.LI(Blaze.View(function() {
      return Spacebars.mustache(view.lookup("name"));
    }), ":", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("fields"));
    })), "\n      " ];
  }), "\n    "), "\n    ", HTML.P("Attributes: ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("collection"));
  }), " ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("id"));
  }), " ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("type"));
  })), "\n  ") ];
}));



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

  Template.Collections.collections = function () {
  var a = new Array();
  _.forEach(Object.getOwnPropertyNames(Collections),
            function(value){a.push({name: value, content:[1,2,3,4,5]})})
  return a;
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
