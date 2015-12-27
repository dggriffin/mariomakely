    var searchString = new Deps.Dependency();

    Template.search.helpers({
        levels: function() {
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
            }).fetch();
        },
        levelCount: function() {
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
        searchValue: function() {
            searchString.depend();
            return $('input').val();
        }
    });

    Template.search.events({
        'change input': function(e) {
            // var value = $(e.currentTarget).val();
            // searchString.changed();
            // Meteor.subscribe('search', value);
        },
        'keydown input': function(e) {
            if (e.keyCode === 13) {
                console.log('honk');
                return false;
            } else {
                var value = $(e.currentTarget).val();
                searchString.changed();
                Meteor.subscribe('search', value);
            }
        }
    });

    //  Template.search.onRendered(() => {
    //     $('input').focus();
    // });