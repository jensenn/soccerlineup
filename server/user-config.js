Meteor.methods({

  setSelectedTeam: function (name) {
    selectTeamByName(name)
  }

});

selectTeamByName = function (teamName) {
    
}

selectTeamById = function (teamId) {
  UserConfig.update(
   {owner: Meteor.userId()},
   {selected_team: teamId},
   { upsert: true });
}

getSelectedTeam = function () {
	selected_team
	UserConfig.findOne({owner: Meteor.userId()}, { _id: 0, selected_team: 1 }, function(err, doc) {
		selected_team = doc.selected_team;
	});
	return selected_team;
}

Meteor.publish('user-config', function() {
  return UserConfig.find({owner: this.userId})
});
