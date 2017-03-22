'use strict';

// ----------- Dependencies

var gulp    = require('gulp'),
    bsrSync = require('browser-sync').create(),
    concat  = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename  = require('gulp-rename'),
    sass    = require('gulp-sass'),
    maps    = require('gulp-sourcemaps'),
    cache   = require('gulp-cache'),
    del     = require('del'),
    runseq  = require('run-sequence');

// ----------- Variables

// Kirby assets
var ka_j = 'assets/js/',
    ka_c = 'assets/css/',
    ka_i = 'assets/images/';

// Kirby site templates & snippets
var ks_s = 'site/snippets/*.php',
    ks_t = 'site/templates/*.php';

// Kirby content
var kc = 'content/**/*.txt';

// src assets
var src_js     = 'src/js/',
    src_js_all = 'src/js/*',
    src_s      = 'src/stringer/**/*.scss';

// ----------- Static Server & Watch Files

gulp.task('serve', ['compileSass'], function() {

    bsrSync.init({
        //proxy: 'localhost:8000',
        //notify: false
    });

    // Watch files during local development
    gulp.watch(src_s, ['compileSass']);
    gulp.watch(src_js_all, ['minifyScripts']);
    gulp.watch(ks_s).on('change', bsrSync.reload);
    gulp.watch(ks_t).on('change', bsrSync.reload);
    gulp.watch(kc).on('change', bsrSync.reload);

});

// ----------- Concat & Minify JS

gulp.task('concatScripts', function() {
  return gulp.src([
    src_js + 'jquery-2.1.4.min.js',
    src_js + 'elmenu.js',
    src_js + 'picturefill.min.js',
    src_js + 'jquery.easing.1.3.js',
    src_js + 'main.js'
  ])
  .pipe(concat('app.js'))
  .pipe(gulp.dest(src_js));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src(src_js + 'app.js')
    .pipe(maps.init())
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(ka_j));
});

// ----------- Compile Sass

gulp.task('compileSass', function () {
  return gulp.src('src/stringer/styles.scss')
    .pipe(maps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('styles.min.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest(ka_c))
    .pipe(bsrSync.stream());
});

// ----------- Cleanup

gulp.task('clean', function(callback) {
  del(ka_c + '*.css*');
  del(ka_j + '*.js*');
  del(src_js + 'app.js');
  return cache.clearAll(callback);
})

// ----------- Build

gulp.task('build', function(callback) {
  runseq('clean', 'compileSass', 'minifyScripts', callback);
});

// ----------- Default (start the local server)

gulp.task('default', ['serve']);
