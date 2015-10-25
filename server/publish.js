if (Meteor.isServer) {
    //Publish only the current user's account
    Meteor.publish("levels", function() {
        return Levels.find();
    });
}