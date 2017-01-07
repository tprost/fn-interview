var express = require('express');
var path = require('path');

var http = require('http');
var expressNunjucks = require('express-nunjucks');

var app = express();

// some config
require('./config/express')(app);
var config = require('./config');

// views
app.locals.js = require('./config/public.js').js();
const isDev = app.get('env') === 'development';

app.set('views', __dirname + '/app/views');

const njk = expressNunjucks(app, {
    watch: isDev,
    noCache: isDev
});

require('./app/routes/home')(app);
require('./app/routes/users')(app);

function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler (err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.use(clientErrorHandler);
app.use(errorHandler);

var server = http.createServer(app);

server.listen(config.port, function(){
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

app.server = server;

module.exports = app;

