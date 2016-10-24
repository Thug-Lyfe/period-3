var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var client = require('./db/redisClient')
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var redis = require("redis");

var routes = require('./routes/index');
var users = require('./routes/users');
var tester = require('./routes/tester')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 15762;
const ENDPOINT = "redis-15762.c10.us-east-1-2.ec2.cloud.redislabs.com";
const PASSWORD = 292335668076;

app.use(session({
  secret: 'hasfkhsakfjdhsa',
  store: new RedisStore({
    host: ENDPOINT,
    port: PORT,
    client: client
  }),
  saveUninitialized: false,
  resave: false,
  cookie: {maxAge: 60*1000} //One min. to make it easy to see that sessions expires
}));

app.use('/', routes);
app.use('/users', users);
app.use('/',tester);
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



module.exports = app;
