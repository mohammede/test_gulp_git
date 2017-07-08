var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass');

var coffeeResources = ['components/coffee/tagline.coffee'];
var sassResources = ['components/sass/style.scss'];
var scriptResources = [
    'components/scripts/pixgrid.js',
    'components/scripts/rclick.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'];
gulp.task('coffee', function () {
    gulp.src(coffeeResources)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
});
gulp.task('js', function () {
    gulp.src(scriptResources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
});
gulp.task('compass', function () {
    gulp.src(sassResources)
        .pipe(compass({
            sass : 'components/sass',
            image : 'builds/development/images',
            style : 'expanded'
        }))
        .pipe(gulp.dest('builds/development/css'))
});
gulp.task('default',['coffee','js','compass']);
gulp.task('watch',function () {
   gulp.watch(coffeeResources,['coffee']);
   gulp.watch(scriptResources,['js']);
   gulp.watch('components/sass/*.scss',['compass']);
});