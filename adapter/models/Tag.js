var  Waterline = require('waterline');
var Tag = Waterline.Collection.extend({
    identity: 'tag',
    connection: 'connection',
    attributes: {
        name: 'string',
        slug:"string",
        feeds: {
            collection: 'feed',
            via: 'tags'
        },
    }
});
module.exports = Tag;