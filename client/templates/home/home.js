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
    	'click button' : function(e){
    		var id = $(e.currentTarget).attr('id');
    		var tags = Session.get('tags');
    		var newList = _.reject(tags.split('&'), (tag) => {return tag === id})
    		var newTags = newList.join('&');
    		Session.set('tags', newTags);
    		Router.go('/' + newTags);
    	}
    })