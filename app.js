var express = require('express');
var path = require('path');
var routes = require('./routes/index');
var users  = require('./routes/users');
var http = require('http');
var expressNunjucks = require('express-nunjucks');

var app = express();

require('./config/express')(app);

var config = require('./config');

const isDev = app.get('env') === 'development';

app.set('views', __dirname + '/views');

const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'nunjucks');

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

app.locals.js = require('./config/public.js').js();
app.locals.test = "asdasd";

var server = http.createServer(app);

server.listen(config.port, function(){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

module.exports = app;
