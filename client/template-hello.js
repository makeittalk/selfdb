Session.setDefault("counter", 0);

Template.__checkName("hello");
Template["hello"] = new Template("Template.hello", (function() {
  var view = this;
  return [ HTML.Raw("<button>Click Me</button>\n  "), HTML.P("You've pressed the button ", Blaze.View(function() {
    return Spacebars.mustache(view.lookup("counter"));
    }), " times.") ];
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