var _ = require('lodash'),
    Waterline = require('waterline');
var orm = new Waterline();

var User = Waterline.Collection.extend({
    identity: 'user',
    connection: 'connection',
    attributes: {
        first_name: 'string',
        last_name: 'string'
    }
});

var Pet = Waterline.Collection.extend({
    identity: 'pet',
    connection: 'connection',

    attributes: {
        name: 'string',
        breed: 'string'
    }
});
var mongoModels, modelConnections;
module.exports.init = function (config) {
    orm.loadCollection(User);
    orm.loadCollection(Pet);
    orm.initialize(config, function (err, models) {
        if (err) throw err;
        mongoModels = models.collections;
        modelConnections = models.connections;
        console.log("To see saved users, visit http://localhost:3000/users");
    });
};

module.exports.createUser = function(user, callback){
    mongoModels.user.create(user, function(err, model) {
        if(err) callback(err, null);
        callback(null, model);
    });
};
