'use strict';
var path = require('path');
var gulp = require('gulp');

var browserSync = require('browser-sync');

var nodemon = require('gulp-nodemon');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');
var server = require( 'gulp-develop-server' );

var BROWSER_SYNC_RELOAD_DELAY = 1000;


var gutil = require('gulp-util');

var conf = {};
conf.paths = {
  src: 'public',
  dist: 'dist',
  tmp: '.tmp',
  e2e: 'e2e'
};

conf.wiredep = {
  exclude: [/jquery/, /bootstrap.js$/],
  directory: 'public/bower_components'
};

conf.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};



gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', function onStart() {
    if (!called) {
      called = true;
      cb();
    }
  })
    .on('restart', function onRestart() {
      setTimeout(function()  {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    })
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
    proxy: 'localhost:3000',
    port: 4000,
    browser: ['google-chrome'],
    notify: true
  });
});

gulp.task('test-server', function() {
  server.listen({
    path: './app.js',
    env: {
      NODE_ENV: 'test',
      SEED: 'seed'
    }
  });
});

gulp.task('prod-test-server', function() {
  server.listen({
    path: './app.js',
    env: {
      NODE_ENV: 'production',
      SEED: 'seed'
    }
  });
});


browserSync.use(browserSyncSpa({
  selector: '[ng-app]'
}));

//Temporary use .start() until gulp 4.0
gulp.task('serve', ['watch'], function () {
  gulp.start('browser-sync');
});

gulp.task('serve:dist', ['build'], function () {
  gulp.start('browser-sync');
});

gulp.task('serve:e2e', ['inject'], function () {
  gulp.start('test-server');
});

gulp.task('serve:e2e-dist', ['build'], function () {
  gulp.start('prod-test-server');
});


function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch(path.join(conf.paths.src, '**/*.css'), function(event) {
    if(isOnlyChange(event)) {
      browserSync.reload(event.path);
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '**/*.html'), function(event) {
    browserSync.reload(event.path);
  });
});


gulp.task('default', function(){});
gulp.task('inject', function(){});
// gulp.task('default', ['clean'], function () {
//   gulp.start('build');
// });
