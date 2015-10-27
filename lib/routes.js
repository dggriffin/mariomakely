Router.route('/', {
    template: 'home',
    name: 'home',
    subscriptions: function() {
        return Meteor.subscribe('levels');
    },
    waitOn: function() {
        return Meteor.subscribe('levels');
    }
});

Router.route('/:_tags', {
    template: 'home',
    data: function(){
    	Session.set('tags', this.params._tags);
    },
    subscriptions: function() {
        return Meteor.subscribe('levels', this.params._tags);
    },
    waitOn: function() {
        return Meteor.subscribe('levels', this.params._tags);
    }
});

//Package to add current route name as a class on the body
Router.onBeforeAction('bodyClass');