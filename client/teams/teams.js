//Meteor.subscribe('teams');

Template.teams.helpers({
//  sortedteams: function () {
//    return Teams.find({}, {sort: {name: 1}});
//  }
});

Template.teams.rendered = function () {
  console.log("teams rendered")  
}

Template.teams.events({

  "submit #newteam": function (event) {

    var text = event.target.text.value;

    Meteor.call("addTeam", text);

    // Clear form
    event.target.text.value = "";

    // Prevent default form submit
    return false;
  },

  "click .delete": function () {
    Meteor.call("removeTeam", this._id);
  },

  "change #my-team-select": function (event) {
    console.log("Selected: " + $(event.target).val())    
  }

});
