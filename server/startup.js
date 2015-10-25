if (Meteor.isServer) {
    Meteor.startup(function() {
        var cheerio = Meteor.npmRequire('cheerio');
        SyncedCron.add({
            name: 'Get new Mario Maker levels',
            schedule: function(parser) {
                // parser is a later.parse object
                return parser.text('every 2 mins');
            },
            job: function() {
                $ = cheerio.load(Meteor.http.get("https://miiverse.nintendo.net/titles/6437256808751874777/6437256808751874782/in_game").content)
                var posts = $('div[class="post post-subtype-default trigger with-image"]');
                var postId;
                var user = {};
                var level = {};
                var contentText = "";
                var codeOffset = 0;
                var tagString = "";
                _.each(posts, function(post) {
                    contentText = $('.post-content-text', post).text();
                    codeOffset = contentText.search(/\(/);
                    level.code = contentText.substring(codeOffset);
                    level.title = contentText.substring(0, codeOffset);
                    tagString = contentText.match(/\[.*\]/g) ? contentText.match(/\[.*\]/g)[0] : "";
                    if (tagString) {
                        tagString = tagString.replace(/\[|]|\s/g, "");
                        level.tags = tagString.split(';');
                        level.postId = post.id;
                        user.icon = $('.icon', post).attr('src');
                        user.name = $('p a[href*=users]', post).text();
                        user.page = $('p a[href*=users]', post).attr('href');
                        level.icon = $('img[src*=cloud]', post).attr('src');
                        level.user = user;
                        Levels.insert(level);
                    }

                });
            }
        });

        SyncedCron.start();
    });
}