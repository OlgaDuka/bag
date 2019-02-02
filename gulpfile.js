'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var minifycss = require('gulp-csso');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

// CLEAN BUILD

gulp.task('clean', function(done) {
  return del('build', done);
});

// HTML

gulp.task('html:del', function(done) {
  return del('build/*.html', done);
});

gulp.task('html:copy', function(done) {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
    done();
});

gulp.task('html', gulp.series('html:del', 'html:copy'));

// CSS

gulp.task('css:del', function(done) {
  return del('build/css/*.css', done);
});

gulp.task('css:copy', function(done) {
  return gulp.src('css/*.css')
    .pipe(gulp.dest('build/css'));
    done();
});

gulp.task('css', gulp.series('css:del', 'css:copy'));

// STYLE

gulp.task('style', function (done) {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer()
      ]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('build/css'))
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
    done();
});

// JS
gulp.task('js:del', function(done) {
  return del('build/js', done);
});

gulp.task('js:copy', function(done) {
  return gulp.src('js/*.js')
    .pipe(gulp.dest('build/js'));
    done();
});

gulp.task('js:scripts', function(done) {
  return gulp.src('js/custom.js')
    .pipe(plumber())
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename(function(path){
      path.basename += '.min';
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
    done();
});

gulp.task('js', gulp.series('js:del', 'js:copy', 'js:scripts'));

// IMAGES

gulp.task('img:del', function(done) {
  return del('build/img/*.*', done);
});

gulp.task('img:copy', function(done) {
  return gulp.src('img/*.{png,jpg,gif,svg}')
    .pipe(gulp.dest('build/img/'));
    done();
});

gulp.task('img-dev', gulp.series('img:del', 'img:copy'));

// LIVE SERVER

gulp.task('reload', function(done){
  server.reload();
  done();
});

gulp.task('serve', function(done) {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('index.html', gulp.series('html', 'reload'));
  gulp.watch('js/*.js', gulp.series('js', 'reload'));
  done();
});

// DEV

gulp.task('dev', gulp.series('clean',
  gulp.series(
    'html',
    'css',
    'style',
    'js',
    'img-dev'
  )
));
