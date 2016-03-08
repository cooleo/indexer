var  Waterline = require('waterline');

var Source = Waterline.Collection.extend({
	identity: 'source',
	connection: 'connection',
	attributes: {
		name: 'string',
		logo: 'string',
		url: 'string'
	}
});
module.exports = Source;
