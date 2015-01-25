"use strict";
describe("Teams", function() {
  
  beforeEach(function() {
    var baseTime = new Date(1999, 1, 1);
    Date = function() {
      return baseTime;
    }
  });

  it ("should not be able to be created by an unauthorized user", function () {
    spyOn(Teams, "insert");

    expect(Meteor.methodMap.addTeam, "My Team").toThrow();
    expect(Teams.insert).not.toHaveBeenCalled();
  });

  it ("should be able to be created by an authorized user", function () {
    spyOn(Teams, "insert");
    spyOn(Meteor, "userId").and.returnValue(1234);

    Meteor.methodMap.addTeam("My Team");
    expect(Teams.insert).toHaveBeenCalledWith({name: "My Team", created: new Date(), owner: 1234});
  });
  
  it ("should be created with a string name", function () {
    spyOn(Teams, "insert");
    spyOn(Meteor, "userId").and.returnValue(1234);
    spyOn(global, "check").and.callFake(function(value, type){
      if (typeof value !== type) {
        throw new Error("bad type");
      }
    });

    expect(Meteor.methodMap.addTeam, 1111).toThrow();
    expect(Teams.insert).not.toHaveBeenCalledWith();
  });

  it ("should be set as the selected team when added", function () {
    spyOn(Teams, "insert").and.returnValue(1);
    spyOn(UserConfig, "update");
    spyOn(Meteor, "userId").and.returnValue(1234);

    Meteor.methodMap.addTeam("My Team");
    expect(UserConfig.update).toHaveBeenCalledWith({owner: 1234}, {selected_team: 1}, {upsert: true});
  });

  it ("should be able to be removed by an authorized user", function () {
    spyOn(Teams, "remove");
    spyOn(Meteor, "userId").and.returnValue(1234);
    spyOn(Teams, "findOne").and.returnValue({_id: 1, owner: 1234});

    Meteor.methodMap.removeTeam(1);
    expect(Teams.remove).toHaveBeenCalledWith({_id: 1, owner: 1234});
  });

  it ("should not be able to be removed by an unauthorized user", function () {
    spyOn(Teams, "remove");

    expect(Meteor.methodMap.removeTeam, 1).toThrow();
    expect(Teams.remove).not.toHaveBeenCalled();
  });

  it ("should not be able to be removed by a user that doesn't own the team", function () {
    spyOn(Teams, "remove");
    spyOn(Meteor, "userId").and.returnValue(5678);
    spyOn(Teams, "findOne").and.callFake(function(query, fields, callback) {
      callback(null, {_id: 1, owner: 1234});
    });
    
    expect(Meteor.methodMap.removeTeam, 1).toThrow();
    expect(Teams.remove).not.toHaveBeenCalled();
  });

  it ("should not be able to remove a non-existant team", function () {
    spyOn(Teams, "remove");
    spyOn(Meteor, "userId").and.returnValue(1234);
    spyOn(Teams, "findOne").and.callFake(function(query, fields, callback) {
      callback({}, null);
    });
    
    expect(Meteor.methodMap.removeTeam, 1).toThrow();
    expect(Teams.remove).not.toHaveBeenCalled();
  });

  it ("should select a new team when removing the selected team", function () {
    spyOn(Meteor, "userId").and.returnValue(1234);
    spyOn(Teams, "findOne").and.returnValue({_id: 2, owner: 1234});
    spyOn(UserConfig, "findOne").and.returnValue({selected_team: 1});
    spyOn(UserConfig, "update");

    Meteor.methodMap.removeTeam(1);
    expect(UserConfig.update).toHaveBeenCalledWith({owner: 1234}, {selected_team: 2}, {upsert: true});
  });

  it ("should only select a new team when removing the selected team", function () {
    spyOn(Meteor, "userId").and.returnValue(1234);
    spyOn(Teams, "findOne").and.returnValue({_id: 2, owner: 1234});
    spyOn(UserConfig, "findOne").and.returnValue(null);
    spyOn(UserConfig, "update");

    Meteor.methodMap.removeTeam(1);
    expect(UserConfig.update).not.toHaveBeenCalled();
  });

});
     