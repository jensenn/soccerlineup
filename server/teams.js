Meteor.publish('teams', function() {
  return Teams.find({owner: this.userId})
});

Meteor.methods({

  addTeam: function (name) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "Access Denied");
    }
    
    check(name, String);
    
    teamId = Teams.insert({
      name: name,
      created: new Date(),
      owner: Meteor.userId()
    });
    
    selectTeamById(teamId)
  },

  removeTeam: function (teamId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error(403, "Access Denied");
    }
    var team = Teams.findOne({_id: teamId}, {_id: 0, owner: 1});
    if (!team) {
      throw new Meteor.Error(404, "Unknown Team");
    }
    if (team.owner !== Meteor.userId()) {
      throw new Meteor.Error(403, "Access Denied");
    }
    Teams.remove({_id: teamId, owner: Meteor.userId()});
    // see if this is the selected team
    var selected_team = UserConfig.findOne({owner: Meteor.userId(), _id: teamId});
    if (selected_team) {
      var some_team = Teams.findOne({owner: Meteor.userId()}, {_id: 1});
      if (some_team) {
        selectTeamById(some_team._id);              
      }
    }
  }
});
