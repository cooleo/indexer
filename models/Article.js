var  Waterline = require('waterline');

var Article = Waterline.Collection.extend({
	identity: 'article',
	connection: 'connection',

	attributes: {
		title: 'string',
		description:'string',
		body: 'text',
		thumb:'string',
		thumbBucket: 'string',
		photos: {
			collection:'photo'
		},
		author: {
			model: 'user'
		}
	}
});
module.exports = Article;
