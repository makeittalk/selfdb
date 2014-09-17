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