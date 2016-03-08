var _ = require('lodash'),
    Waterline = require('waterline');
var orm = new Waterline();


var _ = require('lodash'),
    chalk = require('chalk'),
    glob = require('glob'),
    fs = require('fs'),
    path = require('path');


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


var getGlobbedPaths = function (globPatterns, excludes) {
    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // The output array
    var output = [];

    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function (globPattern) {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            var files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function (file) {
                    if (_.isArray(excludes)) {
                        for (var i in excludes) {
                            file = file.replace(excludes[i], '');
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
        }
    }

    return output;
};

var modelFiles = getGlobbedPaths('models/*.js')
// Globbing model files
console.log('modelFiles:' + modelFiles.length);
modelFiles.forEach(function (modelPath) {
    console.log(modelPath);
    require(path.resolve(modelPath));
});


var mongoModels, modelConnections;
module.exports.init = function (config) {
    orm.loadCollection('Tag');
    orm.loadCollection('App');
    orm.initialize(config, function (err, models) {
        if (err) throw err;
        mongoModels = models.collections;
        modelConnections = models.connections;
    });
};

module.exports.createUser = function(user, callback){
    mongoModels.user.create(user, function(err, model) {
        if(err) callback(err, null);
        callback(null, model);
    });
};
