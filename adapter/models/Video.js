
var  Waterline = require('waterline');

var Video = Waterline.Collection.extend({
  identity: 'video',
  connection: 'connection',
  attributes: {
    title: 'string',
    description: 'string',
    bucket: 'string',
    filename: 'string',
    embed:'string',
    sourceId:'string',
    duaration: 'string',
    length:    'string',
    thumbBucket: 'string',
    thumb: 'string',
    type: 'integer', // 0: internal, 1: external
    source:{
      model:'source'
    },
    extention: 'string'
  }
});
module.exports = Video;
