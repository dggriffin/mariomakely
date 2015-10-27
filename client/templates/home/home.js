    Template.home.helpers({
        levels: function() {
            return Levels.find().fetch();
        },
        userTags: function() {
            if (Session.get('tags')) {
                return Session.get('tags').split('&');
            } else {
                return [];
            }
        }
    });

    Template.home.events({
        'click button': function(e) {
            var id = $(e.currentTarget).attr('id');
            var tags = Session.get('tags');
            var newList = _.reject(tags.split('&'), (tag) => {
                return tag === id
            })
            var newTags = newList.join('&');
            Session.set('tags', newTags);
            Router.go('/' + newTags);
        }
    });

    Template.home.onRendered(() => {
        $('.time').text(function(){
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