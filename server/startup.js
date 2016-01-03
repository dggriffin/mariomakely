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
                    if (tagString.trim() && !Levels.findOne({
                        code: level.code
                    })) {
                        tagString = tagString.replace(/\[|]|\s/g, "").toLowerCase();
                        level.tags = tagString.split(';');
                        level.date = new Date();
                        level.postId = post.id;
                        user.icon = $('.icon', post).attr('src');
                        user.name = $('p a[href*=users]', post).text();
                        user.page = $('p a[href*=users]', post).attr('href');
                        level.icon = $('img[src*=cloud]', post).attr('src');
                        level.user = user;
                        Levels.insert(level);

                        _.each(level.tags, function(tag) {
                            var tagFound = Tags.findOne({
                                tag: tag
                            });
                            if (tagFound) {
                                Tags.update({
                                    _id: tagFound._id
                                }, {
                                    $inc: {
                                        count: 1
                                    }
                                });
                            } else {
                                Tags.insert({
                                    tag: tag,
                                    count: 1
                                });
                            }
                        });
                    }

                });
            }
        });

        SyncedCron.add({
            name: 'Curate removed levels',
            schedule: function(parser) {
                // parser is a later.parse object
                return parser.text('every 24 hours');
            },
            job: function() {
                Levels.find().fetch().forEach((level) => {
                    try {

                        Meteor.http.get(level.icon);

                    } catch (e) {
                        Levels.remove({
                            _id: level._id
                        });
                    }

                });
            }
        });
        SyncedCron.start();
    });
}