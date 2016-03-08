var  Waterline = require('waterline');
var Tag = Waterline.Collection.extend({
    identity: 'tag',
    connection: 'connection',
    attributes: {
        name: 'string'
    }
});
module.exports = Tag;