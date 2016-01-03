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
                limit: 6
            })
        }

    });

    Meteor.publish("search", function(searchString, filter) {
        if(filter === 'tags'){
            return Levels.find({
                tags: {
                    $in: [searchString]
                }
            }, {
                sort: {
                    date: -1
                }
            });
        }
        else if (filter === "name") {
            return Levels.find({
                title: {
                    $regex: `.*${searchString}.*`
                }
            }, {
                sort: {
                    date: -1
                }
            });

        }
        else if (filter === "creator"){
            return Levels.find({
                "user.name": {
                    $regex: `.*${searchString}.*`
                }
            }, {
                sort: {
                    date: -1
                }
            });
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