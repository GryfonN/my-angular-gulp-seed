'use strict';

var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function (options) {

  //only reload
  gulp.task('browser-realod', browserSync.reload);

  //Sync inject > Reload
  gulp.task('injectAndReload', gulpsync.sync(['inject', 'browser-realod']));

  //watcher
  gulp.task('watch', ['inject'], function () {

    //HTML index.html only
    gulp.watch([options.src + '/*.html', 'bower.json'], options.gulpWatch, function (event) {
      gulp.start('injectAndReload');
    });

    //CSS
    gulp.watch(options.src + '/app/**/*.css', options.gulpWatch, function (event) {
      if (isOnlyChange(event)) {
        browserSync.reload(event.path);
      } else {
        gulp.start('injectAndReload');
      }
    });

    //JS
    gulp.watch(options.src + '/app/**/*.js', options.gulpWatch, function (event) {
      if (isOnlyChange(event)) {
        gulp.start('scripts');
        browserSync.reload(event.path);
      } else {
        gulp.start('injectAndReload');
      }
    });

    //HTML ngTemplates
    gulp.watch(options.src + '/app/**/*.html', options.gulpWatch, function (event) {
      browserSync.reload(event.path);
    });
  });

};//module.exports