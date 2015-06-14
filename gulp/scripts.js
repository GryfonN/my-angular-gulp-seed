'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('scripts', function () {
    return gulp.src(options.src + '/app/**/*.js')
      //gryfonn-gulp
      .pipe($.changed(options.src + '/{app,components}/**/*.js'))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      //gryfonn-gulp
      //.pipe(browserSync.reload({ stream: true }))
      .pipe($.size());
  });
};
