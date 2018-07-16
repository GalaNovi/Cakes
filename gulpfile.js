'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var del = require('del');
var newer = require('gulp-newer');
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var browserSync = require('browser-sync').create();
// var debug = require('gulp-debug');
// var soursemaps = require('gulp-sourcemaps');
// var gulpIf = require('gulp-if');

// var isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('style', function () {
  return gulp.src('src/less/style.less')
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('dev/css'))
});

gulp.task('copy', function () {
  return gulp.src('src/{fonts,img}/**/*.*', {since: gulp.lastRun('copy')})
  .pipe(newer('dev'))
  .pipe(gulp.dest('dev'))
});

gulp.task('copyHTML', function () {
  return gulp.src('src/*.html', {since: gulp.lastRun('copyHTML')})
  .pipe(newer('dev'))
  .pipe(gulp.dest('dev'))
});

gulp.task('clean', function () {
  return del('dev');
});

gulp.task('serve', function () {
  browserSync.init({
    server: 'dev',
    notify: false
  });

  browserSync.watch('dev/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', gulp.series('style'));
  gulp.watch('src/{fonts,img}/**/*.*', gulp.series('copy'));
  gulp.watch('src/*.html', gulp.series('copyHTML'));
});

gulp.task('dev', gulp.series(gulp.parallel('style', 'copy', 'copyHTML'), gulp.parallel('watch', 'serve')));
