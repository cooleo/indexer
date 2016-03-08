var  Waterline = require('waterline');

var Category = Waterline.Collection.extend({
  identity: 'category',
  connection: 'connection',

  attributes: {
    name: {
      type: 'string'
    },
    description: 'string',
    slug: 'string',
    subribles:'text',
    category: {
      collection:'category'
    }
  }
});
module.exports = Category;

