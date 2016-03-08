var _ = require('lodash'),
    Waterline = require('waterline');
var orm = new Waterline();


// load models here
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
var redisModels, modelConnections;

module.exports.init = function (config) {
    orm.loadCollection(User);
    orm.loadCollection(Pet);
    orm.initialize(config, function (err, models) {
        if (err) throw err;
        redisModels = models.collections;
        modelConnections = models.connections;
    });
};
module.exports.createUser = function (user, callback) {
    redisModels.user.create(user, function (err, model) {
        if (err) callback(err, null);
        callback(null, model);
    });
};
module.exports.getAllUsers = function (callback) {
    redisModels.user.find().exec(function (err, models) {
        if (err) callback(err, null);
        callback(null, models);
    });
}
