var  Waterline = require('waterline');
var Photo = Waterline.Collection.extend({
  identity: 'photo',
  connection: 'connection',

  attributes: {
    title: 'string',
    width: 'integer',
    height: 'integer',
    bucket: 'string',
    filename: 'string',
    extention: 'string',
    type: 'integer',           //0 internal, 1 external
    source:{
      model:'source'
    }
  }
});
module.exports = Photo;

