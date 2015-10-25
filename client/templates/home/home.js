    Template.home.helpers({
        levels: function() {
            return Levels.find().fetch();
        }
    });