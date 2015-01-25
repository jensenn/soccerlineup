"use strict";
describe("Team Template", function() {

//  it("should show the login screen if not logged in", function () {
//    var div = document.createElement("DIV");
//    Blaze.render(Template.teams, div);
//
//    console.log(div.innerHTML);
//
//    expect($(div).find("#TeamsNav")[0]).not.toBeDefined();
//  });

  it("should show created teams", function () {
    var div = document.createElement("DIV");
    var data = {teams: [{name: "team 1"}, {name: "team 2"}]};
    
    Blaze.renderWithData(Template.teams, data, div);
    
    // console.log(div.innerHTML);
    
    expect($(div).find("span:contains('team 1')")[0]).toBeDefined();    
    expect($(div).find("span:contains('team 2')")[0]).toBeDefined();    
  });

  it("should show teams in alphabetical order", function () {
    var route = _.findWhere(Router.routes, {_path: "/teams"});
    spyOn(Teams, "find").and.returnValue({});

    var data = route.options.data();
    expect(Teams.find.calls.mostRecent().args[0]).toEqual({});
    expect(Teams.find.calls.mostRecent().args[1].sort.name).toEqual(1);
    expect(data).toEqual({teams: {}});
  });

  it("should have a new team form", function () {
    var div = document.createElement("DIV");
    Blaze.render(Template.teams, div);
    
    // console.log(div.innerHTML);
    
    expect($(div).find("#newteam")[0]).toBeDefined();
    
  });

  it("should be able to create a new team", function () {
    spyOn(Blaze, "getData").and.returnValue({});
    spyOn(Meteor, "call");

    var div = document.createElement("DIV");
    Blaze.render(Template.teams, div);
    
    // console.log(div.innerHTML);
    
    var eventContext = {templateInstance: function() {}};
    var submit_data = {target: {text: "team 1"}};
    Template.teams.__eventMaps[0]["submit #newteam"].call(eventContext, submit_data);
    
    expect(Meteor.call.calls.mostRecent().args[0]).toEqual("addTeam");
  });

  it("should be able to delete an existing team", function () {
    spyOn(Blaze, "getData").and.returnValue({
      teams: [{_id: 1, name: "team 1"},
              {_id: 2, name: "team 2"}]
    });
    spyOn(Meteor, "call");

    var div = document.createElement("DIV");
    var data = {teams: [{_id: 1, name: "team 1"}, {_id: 2, name: "team 2"}]};
    
    Blaze.render(Template.teams, div);
    
    console.log(div.innerHTML);
    
    var eventContext = {templateInstance: function() {}};
    var submit_data = {}; //{target: {_id: 1}};
    Template.teams.__eventMaps[0]["click .delete"].call(eventContext, submit_data);
    
    expect(Meteor.call.calls.mostRecent().args[0]).toEqual("removeTeam");
  });

});
