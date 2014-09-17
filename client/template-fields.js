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

Template.Fields.fields = function () {
    return Fields.find({}, {sort: {name: 1}});
};