Meteor.publish("fields", function () {
  return _Fields.find({}, {});
});

Meteor.publish("schemas", function () {
  return _Schemas.find({}, {});
});