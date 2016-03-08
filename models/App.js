var  Waterline = require('waterline');

var App = Waterline.Collection.extend({
  identity: 'app',
  connection: 'connection',

  attributes: {
    name: 'string',
    breed: 'string'
  }
});
module.exports = App;
