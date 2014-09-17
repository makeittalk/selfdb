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


Template.Schemas.schemas = function () {
    return Schemas.find({}, {sort: {name: 1}});
};
