var _ = require('lodash'),
    Waterline = require('waterline');
var orm = new Waterline();


var _ = require('lodash'),
    chalk = require('chalk'),
    glob = require('glob'),
    fs = require('fs'),
    path = require('path');


var App = require('./models/App');
var Article = require('./models/Article');
var Book = require('./models/Book');
var Category = require('./models/Category');
var Channel = require('./models/Channel');
var Country = require('./models/Country');
var Game = require('./models/Game');
var Movies = require('./models/Movies');
var Music = require('./models/Music');
var Photo = require('./models/Photo');
var Source = require('./models/Source');
var Tag = require('./models/Tag');
var User = require('./models/User');
var Video = require('./models/Video');
var Feed = require('./models/Feed');


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

//var modelFiles = getGlobbedPaths('models/*.js')
//// Globbing model files
//console.log('modelFiles:' + modelFiles.length);
//modelFiles.forEach(function (modelPath) {
//    console.log(modelPath);
//   // require(path.resolve(modelPath));
//});


var mongoModels, modelConnections;
module.exports.init = function (config) {
    orm.loadCollection(App);
    orm.loadCollection(Article);
    orm.loadCollection(Book);
    orm.loadCollection(Category);
    orm.loadCollection(Channel);
    orm.loadCollection(Country);
    orm.loadCollection(Feed);
    orm.loadCollection(Game);
    orm.loadCollection(Movies);
    orm.loadCollection(Music);
    orm.loadCollection(Photo);
    orm.loadCollection(Source);
    orm.loadCollection(Tag);
    orm.loadCollection(User);
    orm.loadCollection(Video);

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

module.exports.createFeed = function(feed, callback){
    mongoModels.feed.create(feed, function(err, model) {
        if(err) callback(err, null);
        callback(null, model);
    });
};

