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

//Package to add current route name as a class on the body
Router.onBeforeAction('bodyClass');
