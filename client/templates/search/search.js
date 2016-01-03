    var searchString = new Deps.Dependency();

    Template.search.helpers({
        levels: function() {
            searchString.depend();
            var value = $('input').val();
            // var tag = Session.get('tags');
            // value = value ? value : tag;
            var levels = Levels.find({
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
                var currentTime = new Date();

                var timeDiff = currentTime - postTime;
                var msec = timeDiff;
                var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
                var hh = Math.floor(msec / 1000 / 60 / 60);
                msec -= hh * 1000 * 60 * 60;
                var mm = Math.floor(msec / 1000 / 60);
                if (dd) {
                    level.date = dd + " days ago"
                } else {
                    level.date = hh ? hh + " hours and " + mm + " minutes ago" : mm + " minutes ago";
                }
            });

            return levels;
        },
        levelCount: function() {
            searchString.depend();
            var value = $('input').val();
            // var tag = Session.get('tags');
            // value = value ? value : tag;
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
        searchValue: function() {
            searchString.depend();
            return $('input').val();
        }
    });

    Template.search.events({
        'keydown input': function(e) {
            if (e.keyCode === 13) {
                return false;
            } else if (e.keyCode === 27) {
                Router.go('home');
            } else {
                var value = $(e.currentTarget).val();
                searchString.changed();
            }
        }
    });

    Template.search.onRendered(() => {
        var tag = Session.get('tags');
        if (tag) {
            $('input').val(tag);
            Session.get('tags', "");
            searchString.changed();
        }
        $('input').focus();
    });