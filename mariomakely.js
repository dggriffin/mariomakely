Router.configure({
    layoutTemplate: 'main',
    notFoundTemplate: '404'
});

if (Meteor.isClient) {
    Meteor.startup(() => {
        Session.set('tags', "");
    });
    Template.main.events({
        'click #search': function() {
            var text = $('input').val().toLowerCase();
            var tags = Session.get('tags');
            tags = tags ? tags + '&' + text : text;
            Session.set('tags', tags);
            Router.go('/' + tags);
            $('input').val('');
        },
        'keypress input': function(evt, template) {
            if (evt.which === 13) {
                let text = $('input').val().toLowerCase();
                let tags = Session.get('tags');
                tags = tags ? tags + '&' + text : text;
                Session.set('tags', tags);
                Router.go('/' + tags);
                $('input').val('');
            }
        }
    });
}