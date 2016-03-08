var  Waterline = require('waterline');

var Country = Waterline.Collection.extend({
  identity: 'country',
  connection: 'connection',

  attributes: {
    name: {
      type: 'string'
    },
    code: {
      type: 'string'
    }
  }
});
module.exports = Country;




