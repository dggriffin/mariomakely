    var searchString = new Deps.Dependency();

    Template.search.helpers({
        levels: () => {
            searchString.depend();
            let value = $('input').val();
            let levels;

            if (value) {
                Meteor.subscribe("search", value, $('.active-filter').text(),  () => {
                    searchString.changed();
                });
                levels = Levels.find({}, {
                    sort: {
                        date: -1
                    }
                }).fetch();

                levels.forEach((level) => {
                    let postTime = new Date(level.date);
                    level.date = convertDateToElapsedTime(postTime);
                });

                return levels;
                }
        },
        levelCount: () => {
            searchString.depend();
            let value = $('input').val();
            return Levels.find().fetch().length;
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
                searchString.changed();
            }
        },
        'click .filter' :function(e){
            $('.filter').removeClass('active-filter');
            var newFilter = $(e.currentTarget).text();
            $(`.filter:contains(${newFilter})`).addClass('active-filter');
            searchString.changed();

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

        var timeDiff = currentTime - date;
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

    var dependTest = () => {
        searchString.depend();
        console.log('wee');
    }