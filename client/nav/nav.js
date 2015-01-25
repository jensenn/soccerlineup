Template.nav.helpers({
  'activeIfTemplateIs': function (template) {
    var currentRoute = Router.current();
    return currentRoute &&
      template === currentRoute.lookupTemplate() ? 'active' : '';
  },
  
  'navs': function () {
    if (Meteor.user() === null)
      return [{tmpl: "home", name: "Home"},
              {tmpl: "about", name: "About"}]
    else
      return [{tmpl: "home", name: "Home"},
              {tmpl: "about", name: "About"},
              {tmpl: "teams", name: "Teams"}]
  }
});

Template.nav.events({
    'click .myclosable': function () {
        var navbar_toggle = $('.navbar-toggle');
        if (navbar_toggle.is(':visible')) {
          navbar_toggle.trigger('click');
        }
    }
});
