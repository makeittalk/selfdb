Meteor.publish("fields", function () {
  return Fields.find({}, {});
});

Meteor.publish("schemas", function () {
  return Schemas.find({}, {});
});