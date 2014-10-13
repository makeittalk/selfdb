//If new DB, create data catalog.
Meteor.startup(function () {
    
    if (Fields.find().count() === 0) {
      
      var names = [
      {name: "_id", type:"String", label: "Id"},
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
      {name: "Fields", fields:["_id","name", "type", "label","createdAt"]},
      {name: "Schemas", fields:["_id","name", "fields","createdAt"]}
      ];
      for (var i = 0; i < names.length; i++)
        Schemas.insert(names[i]);
    }

  });

