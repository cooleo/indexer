var  Waterline = require('waterline');
var User = Waterline.Collection.extend({
    identity: 'user',
    connection: 'connection',
    attributes: {
        email: {
            type: 'string',
            required: true,
            unique: true
        }
    }
});
module.exports = User;
