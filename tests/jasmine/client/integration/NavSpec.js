describe("Nav bar", function() {

  it("should not show team link to anonymous user", function () {
    var div = document.createElement("DIV");
    Blaze.render(Template.nav, div);
    
    expect($(div).find("#TeamsNav")[0]).not.toBeDefined();
  });

  it("should be able to login normal user", function (done) {
    Meteor.loginWithPassword('test', 'test1234', function (err) {
      expect(err).toBeUndefined();
      done();
    });
  });

  it("should show team link to a logged in user", function () {
    var div = document.createElement("DIV");
    Blaze.render(Template.nav, div);
    // console.log(div.innerHTML);
    expect($(div).find("#TeamsNav")[0]).toBeDefined();
  });

  it("should be able to logout", function (done) {
    Meteor.logout(function (err) {
      expect(err).toBeUndefined();
      done();
    });
  });
});
