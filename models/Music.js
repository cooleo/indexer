var  Waterline = require('waterline');
var Music = Waterline.Collection.extend({
  identity: 'music',
  connection: 'connection',

  attributes: {
    title: 'string',
    description: 'string',
    bucket: 'string',
    filename: 'string',
    duaration: 'string',
    length:    'string',
    thumbBucket: 'string',
    thumb: 'string',
    artist: 'string',
    type: 'integer', // movies, music mv, clip, funny clip...
    extention: 'string'
  }
});
module.exports = Music;