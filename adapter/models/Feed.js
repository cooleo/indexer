
var  Waterline = require('waterline');

var Feed = Waterline.Collection.extend({
    identity: 'feed',
    connection: 'connection',

    attributes: {
        title: 'string',
        description: 'string',
        url: {
            type: 'string',
           // unique:true
        },
        content: 'text',
        source: {
            model: 'source'
        },
        owner: {
            model: 'user'
        },
        thumbBucket: 'string',
        thumb: 'string',
        likes: 'integer',
        shares: 'integer',
        pins: 'integer',
        comments: 'integer',
        points: 'integer', // = sum(likes, shares, pins, comments)
        tags: {
            collection: 'tag',
            via:'feeds'
        },
        status: 'integer',//1 active, 0 inactive
        video: {
            model: 'video'
        },
        photo: {
            model: 'photo'
        },
        article: {
            model: 'article'
        }
    }
});
module.exports = Feed;






