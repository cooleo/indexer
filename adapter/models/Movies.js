var Waterline = require('waterline');

var Movies = Waterline.Collection.extend({
    identity: 'movies',
    connection: 'connection',

    attributes: {
        slug: 'string',
        title: 'string',
        description: 'string',
        duaration: 'string',
        length: 'integer',
        imbd: 'string',
        year: 'integer',
        actors: 'string',
        actist: 'string',
        url: 'string',
        content: 'text',
        thumbBucket: 'string',
        thumb: 'string',
        content: 'string',
        country: {
            model: 'country'
        },
        videos: {
            collection: 'video'
        }
    }
});
module.exports = Movies;

