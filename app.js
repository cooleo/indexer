
var express = require('express'),
    _ = require('lodash'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');


var env = require('./config/env/local');
var redisConfig = env.redis;
var mongoConfig = env.mongo;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var App = require('./adapter/models/App');

var mongodb = require('./adapter/mongo');
mongodb.init(mongoConfig);


var redis = require('./adapter/redis');
redis.init(redisConfig);


app.get('/users', function(req, res) {
  redis.getAllUsers(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});
app.get('/feeds', function(req, res) {
  mongodb.getAllFeeds(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});

app.post('/users', function(req, res) {
  mongodb.createUser(req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    redis.createUser(model, function(err, respone) {
      if(err) return res.json({ err: err }, 500);
      res.json(respone);
    });
  });

});

app.post('/feeds', function(req, res) {
  redis.createFeed(req.body, function(err, response) {
    if(err) return res.json({ err: err }, 500);
     res.json(response);
    console.log("cuccut........."+ JSON.stringify(response));
    //redis.createFeed(response, function(err, model) {
    //  if(err) return res.json({ err: err }, 500);
    //  res.json(model);
    //});
  });

});
app.post('/tags', function(req, res) {
  redis.createTag(req.body, function(err, response) {
    if(err) return res.json({ err: err }, 500);
    res.json(response);
    console.log("cuccut........."+ JSON.stringify(response));
    //redis.createFeed(response, function(err, model) {
    //  if(err) return res.json({ err: err }, 500);
    //  res.json(model);
    //});
  });

});

app.get('/users/:id', function(req, res) {
  app.models.user.findOne({ id: req.params.id }, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

app.delete('/users/:id', function(req, res) {
  app.models.user.destroy({ id: req.params.id }, function(err) {
    if(err) return res.json({ err: err }, 500);
    res.json({ status: 'ok' });
  });
});

app.put('/users/:id', function(req, res) {
  // Don't pass ID to update
  delete req.body.id;

  app.models.user.update({ id: req.params.id }, req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

app.listen(3000);
/*

 */