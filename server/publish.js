if (Meteor.isServer) {
    //Publish only the current user's account
    Meteor.publish("levels", function(tags) {
        if (tags) {
            return Levels.find({
                tags: {
                    $in: tags.split('&')
                }
            });
        } else {
            return Levels.find();
        }

    });
}