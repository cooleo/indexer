var  Waterline = require('waterline');
var Channel = Waterline.Collection.extend({
  identity: 'channel',
  connection: 'connection',

  attributes: {
    name: 'string',
    description: 'string',
    slug: 'string'
  }
});
module.exports = Channel;



