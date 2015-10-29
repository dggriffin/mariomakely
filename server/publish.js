if (Meteor.isServer) {
    //Publish only the current user's account
    Meteor.publish("levels", function(tags) {
        if (tags) {
            return Levels.find({
                tags: {
                    $in: tags.split('&')
                }
            }, {
                sort: {
                    date: -1
                }
            });
        } else {
            return Levels.find({}, {
                sort: {
                    date: -1
                },
                limit: 25
            })
        }

    });

    Meteor.publish("topTags", function() {
        return Tags.find({
            count: {
                $gte: 5
            }
        });
    });
}