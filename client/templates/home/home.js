    Template.home.helpers({
        levels: function() {
            var levels = Levels.find({}, {
                sort: {
                    date: -1
                },
                limit: 6
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
        userTags: function() {
            if (Session.get('tags')) {
                return Session.get('tags').split('&');
            } else {
                return [];
            }
        },
        popularTags: function() {
            return Tags.find().fetch();
        }
    });

    Template.home.events({
        'click button': function(e) {
            var id = $(e.currentTarget).attr('id');
            var tags = Session.get('tags');
            var newList = _.reject(tags.split('&'), (tag) => {
                return tag === id
            });
            var newTags = newList.join('&');
            Session.set('tags', newTags);
            Router.go('/' + newTags);
        },
        'click .side-tags button,.level-tags button': function(e) {
            var id = $(e.currentTarget).text().trim();
            var tags = Session.get('tags');
            tags = tags ? tags + '&' + id : id;
            Session.set('tags', tags);
            Router.go('/' + tags);
            $('input').val('');
        }
    });

    Template.home.onRendered(() => {
        $('.time').text(function() {
            var postTime = new Date(this.textContent);
            var currentTime = new Date();

            var timeDiff = currentTime - postTime;
            var msec = timeDiff;
            var hh = Math.floor(msec / 1000 / 60 / 60);
            msec -= hh * 1000 * 60 * 60;
            var mm = Math.floor(msec / 1000 / 60);
            return hh ? hh + " hours and " + mm + " minutes ago" : mm + " minutes ago";
        });
    });