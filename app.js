var express = require('express');
var path = require('path');

var http = require('http');
var expressNunjucks = require('express-nunjucks');

// var favicon = require('serve-favicon');
// var morgan = require('morgan');
// var compression = require('compression');
var bodyParser = require('body-parser');
// var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
// var errorHandler = require('errorhandler');
var session = require('express-session');
var passport = require('passport');

var app = express();

// app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./app/middleware/authentication.js');
app.use(session({ secret: 'nyan' }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(methodOverride());
app.use(cookieParser());

var env = app.get('env');

var config = require('./config');

app.use(express.static(path.join(config.root, 'dist')));
app.use('/public', express.static(path.join(config.root, 'public')));
app.use('/', express.static(path.join(config.root, 'public')));


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
require('./app/routes/photos')(app);

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
