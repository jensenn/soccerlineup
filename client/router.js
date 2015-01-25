Router.configure({
    layoutTemplate: 'layout'
});

Router.route('home',{path: '/'});
Router.route('about');
Router.route('login');
Router.route('teams', {
  waitOn: function () {
    return Meteor.subscribe('teams');
  },
  data: function () {
    return {teams: Teams.find({}, {sort: {name: 1}}) };
  },
  cache: true,
  onBeforeAction: function () {
      if (! Meteor.userId()) {
          this.render('login');
      }
      else {
          this.next();
      }
  }
});

Router.onBeforeAction('loading');
