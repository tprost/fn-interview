'use strict';

var path = require('path');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');
var server = require( 'gulp-develop-server' );
var gutil = require('gulp-util');

var BROWSER_SYNC_RELOAD_DELAY = 1000;

var conf = {
  paths: {
    src: 'public',
    dist: 'dist',
    tmp: '.tmp',
    e2e: 'e2e'
  },
  wiredep: {
    exclude: [/jquery/, /bootstrap.js$/],
    directory: 'public/bower_components'
  },
  errorHandler: function(title) {
    'use strict';
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  }
};

browserSync.use(browserSyncSpa({
  selector: '[ng-app]'
}));

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'public'
    ],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', function onStart() {
    if (!called) {
      called = true;
      cb();
    }
  }).on('restart', function onRestart() {
    setTimeout(function()  {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
    proxy: 'localhost:3000',
    port: 4000,
    browser: ['google-chrome'],
    notify: true
  });
});

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

gulp.task('watch', ['inject'], function () {

  //   gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch(path.join(conf.paths.src, '/css/**/*.css'), function(event) {

    gulp.start('inject');
    if(isOnlyChange(event)) {
      browserSync.reload(event.path);
    }


  });

  gulp.watch(path.join(conf.paths.src, '**/*.js'), function(event) {
    if(isOnlyChange(event)) {
      // gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.paths.src, '/templates/**/*.html'), function(event) {
    gulp.start('inject');
    browserSync.reload(event.path);
  });
});

gulp.task('default', ['serve'], function() {

});

gulp.task('inject', [], function () {

  gulp.src(path.join(conf.paths.src, '/css/**/*.css'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/css')));

  gulp.src(path.join(conf.paths.src, '/templates/**/*.html'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/templates')));

});

