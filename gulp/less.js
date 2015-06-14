'use strict';

//gryfonn-gulp

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


module.exports = function (options) {
  gulp.task('less', function () {
    return gulp.src([
      options.src + '/**/*.less',
      '!' + options.src + '/**/_*.less'
    ])
      .pipe($.less())
      .pipe(gulp.dest(options.src));
  });
};