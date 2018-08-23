'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require("gulp-plumber");
var del = require('del');
var newer = require('gulp-newer');
var browserSync = require('browser-sync').create();
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var webp = require("gulp-webp");
var gulpAutoprefixer = require('gulp-autoprefixer');
var jsfiles = require('./jsfiles.json');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('js', function () {
  return gulp.src(jsfiles, {base: 'src/js/modules'})
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(concat('all.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('dev/js'));
});

gulp.task('images', function() {
  return gulp.src('src/img/**/*.{jpg,png}')
    .pipe(cache(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imageminJpegRecompress({
        loops: 5,
        min: 50,
        max: 60,
        quality:'medium'
      }),
      imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: '50-60', speed: 5})
    ],{
      // verbose: true
    })))
    .pipe(gulp.dest('dev/img'));
});

gulp.task('clearCache', function (done) {
  return cache.clearAll(done);
});

gulp.task('webp', function() {
  return gulp.src('src/img/**/*.{jpg,png}', {since: gulp.lastRun('webp')})
    .pipe(newer('dev/img'))
    .pipe(webp({quality: 70}))
    .pipe(gulp.dest("dev/img"));
});

gulp.task('style', function () {
  return gulp.src('src/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulpAutoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
      grid: true
    }))
    .pipe(gulp.dest('dev/css'))
});

gulp.task('copy', function () {
  return gulp.src('src/{fonts,js}/*.*', {since: gulp.lastRun('copy')})
  .pipe(newer('dev'))
  .pipe(gulp.dest('dev'))
});

gulp.task('copyHTML', function () {
  return gulp.src('src/*.html', {since: gulp.lastRun('copyHTML')})
  .pipe(newer('dev'))
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('dev'))
});

gulp.task('clean', function () {
  return del('dev');
});

gulp.task('sprite', function() {
  return gulp.src("src/img/icon-*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("dev/img"));
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
  gulp.watch('src/{fonts,img,js}/**/*.*', gulp.series('copy'));
  gulp.watch('src/*.html', gulp.series('copyHTML'));
});

gulp.task('dev', gulp.series(gulp.parallel('style', 'copy', 'images', 'webp', 'js', gulp.series('sprite', 'copyHTML')), gulp.parallel('clearCache', 'watch', 'serve')));
