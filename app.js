/*var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app; */



var express = require('express'),
    _ = require('lodash'),
    app = express(),
    Waterline = require('waterline'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');


var env = require('./config/env/local');
var redisConfig = env.redis;
var mongoConfig = env.mongo;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());



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

app.post('/users', function(req, res) {
  redis.createUser(req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    mongodb.createUser(req.body, function(err, model) {
      if(err) return res.json({ err: err }, 500);
      res.json(model);
    });
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
