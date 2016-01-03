Router.route('/', {
    template: 'home',
    name: 'home',
    subscriptions: function() {
        return [Meteor.subscribe('levels'), Meteor.subscribe('topTags')];
    }
});


Router.route('/search', {
    template: 'search',
    name: 'search'
});


Router.route('/search/:_tags', {
    template: 'search',
    name: 'searchtag',
    data: function() {
        Session.set('tags', this.params._tags.toLowerCase());
    }
});

//Package to add current route name as a class on the body
Router.onBeforeAction('bodyClass');