    var searchString = new Deps.Dependency();

    Template.search.helpers({
        levels: () => {
            searchString.depend();
            var value = $('input').val();
            var levels;
            if (value) {
                levels = Levels.find({
                    tags: {
                        $in: [value.toLowerCase()]
                    }
                }, {
                    sort: {
                        date: -1
                    }
                }).fetch();

                levels.forEach((level) => {
                    var postTime = new Date(level.date);
                    level.date = convertDateToElapsedTime(postTime);
                });

                return levels;
            }
        },
        levelCount: () => {
            searchString.depend();
            var value = $('input').val();
            return Levels.find({
                tags: {
                    $in: [value]
                }
            }, {
                sort: {
                    date: -1
                }
            }).fetch().length;
        },
        searchValue: () => {
            searchString.depend();
            return $('input').val();
        }
    });

    Template.search.events({
        'input input': function(e) {
            if (e.keyCode === 13) {
                return false;
            } else if (e.keyCode === 27) {
                Router.go('home');
            } else {
                var value = $(e.currentTarget).val();
                Meteor.subscribe("search", value, () =>{
                    searchString.changed();
                });

            }
        }
    });

    Template.search.onRendered( () => {
        var tag = Session.get('tags');
        if (tag) {
            $('input').val(tag);
            $('input').trigger('input');
            Session.set('tags', "");
        }
        $('input').focus();
    });


    var convertDateToElapsedTime = (date) => {
        var currentTime = new Date();

        var timeDiff = currentTime - postTime;
        var msec = timeDiff;
        var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        if (dd) {
            return dd + " days ago";
        } else {
            return hh ? hh + " hours and " + mm + " minutes ago" : mm + " minutes ago";
        }
    };