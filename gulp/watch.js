'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function (options) {
  gulp.task('watch', ['inject'], function () {

    gulp.watch([options.src + '/*.html', 'bower.json'], options.gulpWatch, ['inject']);

    gulp.watch(options.src + '/app/**/*.css', options.gulpWatch, function (event) {
      if (isOnlyChange(event)) {
        browserSync.reload(event.path);
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.src + '/app/**/*.js', options.gulpWatch, function (event) {
      if (isOnlyChange(event)) {
        gulp.start('scripts');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(options.src + '/app/**/*.html', options.gulpWatch, function (event) {
      browserSync.reload(event.path);
    });
  });
};
