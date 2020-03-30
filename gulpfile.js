var gulp = require('gulp'), // import gulp into this file.
    gutil = require('gulp-util'),  // import gulp-util plugins into this file.
    coffee = require('gulp-coffee'),  // import coffee script plugin
    browserify = require('gulp-browserify'),  // import browserify to load jquery and mustache libraries
    compass = require('gulp-compass'),  // import Sass and Compass 
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
]
var sassSources = ['components/sass/style.scss'];

gulp.task('coffee', async function() {
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true}) // send the contents of what we got from src method. send it to coffee variable. bare:true - complies javascript without putting it in a safty wrapper. refer: http://coffeescript.org/
            .on('error', gutil.log)) // send coffee script error information as a log to console.
        .pipe(gulp.dest('components/scripts')) // send the file to the destination once the process is done.
});

gulp.task('js', async function() {
    gulp.src(jsSources)
        .pipe(concat('script.js')) // concatinate all js files to script.js
        .pipe(browserify()) // load jQuery and Mustache libraries
        .pipe(gulp.dest('builds/development/js'))  // send the concatinated file to the destination folder.
});

gulp.task('compass', async function() {
    gulp.src(sassSources)
      .pipe(compass({
        sass: 'components/sass',
        image: 'builds/development/images',
        style: 'expanded'
      })
      .on('error', gutil.log))
      .pipe(gulp.dest('builds/development/css'))  // send the file to the destination folder.
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, gulp.series('coffee'));  // if something changes in coffeeSources then execute coffee file
    gulp.watch(jsSources, gulp.series('js')); // if something changes in jsSources then execute js file
    gulp.watch('components/sass/*.scss', gulp.series('compass')); // Since sassSource is only importing files, we need to add all scss files to be able to watch the changes.
});

gulp.task('default', gulp.series('coffee', 'js', 'compass', 'watch')); // add series of tasks that we want to execute


// Gulp version 4 changed the syntax as below
// gulp.task('default', gulp.series('sass', 'js', 'watch'));
// gulp.watch('app/scss/*.scss', gulp.series('sass'));
/*
gulp.task('log', function() {
    gutil.log('Workflows are awesome')
});
*/