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

module.exports.createVideo = function(video, callback){
    mongoModels.video.create(video, function (err, model) {
        if (err) callback(err, null);
        callback(null, model);
    });
};

module.exports.createPhoto = function(photo, callback){
    mongoModels.photo.create(photo, function (err, model) {
        if (err) callback(err, null);
        callback(null, model);
    });
};

module.exports.createArticle = function(article, callback){
    mongoModels.article.create(article, function (err, model) {
        if (err) callback(err, null);
        callback(null, model);
    });
};

module.exports.createUser = function (user, callback) {
    mongoModels.user.create(user, function (err, model) {
        if (err) callback(err, null);
        callback(null, model);
    });
};
module.exports.createFeed = function(feed, callback){
    mongoModels.feed.create(feed, function(err, model) {
        if(err) callback(err, null);
        callback(null, model);
    });
};

module.exports.getAllUsers = function (callback) {
    mongoModels.user.find().exec(function (err, models) {
        if (err) callback(err, null);
        callback(null, models);
    });
};


module.exports.getAllFeeds = function (callback) {
    mongoModels.feed.find().exec(function (err, models) {
        if (err) callback(err, null);
        callback(null, models);
    });
};