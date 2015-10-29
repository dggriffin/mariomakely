Router.route('/', {
    template: 'home',
    name: 'home',
    subscriptions: function() {
        return [Meteor.subscribe('levels'), Meteor.subscribe('topTags')];
    }
});

Router.route('/:_tags', {
    template: 'home',
    data: function(){
    	Session.set('tags', this.params._tags.toLowerCase());
    },
    subscriptions: function() {
        return [Meteor.subscribe('levels', this.params._tags),, Meteor.subscribe('topTags')];
    }
});

//Package to add current route name as a class on the body
Router.onBeforeAction('bodyClass');