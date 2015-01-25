 Meteor.startup(function() {
   if (Meteor.users.find().count() == 0) {
     var users = [
       {username:"test", password: "test1234"}
     ];
 
     _.each(users, function (user) {
        var id = Accounts.createUser({
            username: user.username,
            password: user.password
        }); 
     });
   };
 });
