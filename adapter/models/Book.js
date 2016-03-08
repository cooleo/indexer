var  Waterline = require('waterline');

var Book = Waterline.Collection.extend({
  identity: 'book',
  connection: 'connection',

  attributes: {
    slug: 'string',
    title: 'string',
    description: 'string',
    writer: 'string',
    publicser: 'string',
    price: 'double',
    year: 'integer',
    language: 'string',
    url: 'string',
    content: 'text',
    thumb: {
      model: 'photo'
    },
    country: {
      model: 'country'
    }

  }
});
module.exports = Book;

