var  Waterline = require('waterline');

var Game = Waterline.Collection.extend({
  identity: 'game',
  connection: 'connection',

  attributes: {
    title: 'string',
    description: 'string',
    bucket: 'string',
    filename: 'string',
    thumbBucket: 'string',
    thumb: 'string', // thumb name, and we can easy scale by size : -origin, -small, -medium : ex: 1939340339303u3.jpg should be thumb=1939340339303u3,
    type: 'integer', // movies, music mv, clip, funny clip...
    extention: 'string'
  }
});
module.exports = Game;







