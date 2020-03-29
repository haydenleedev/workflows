var gulp = require('gulp'), // import gulp into this file.
    gutil = require('gulp-util'),  // import gulp-util plugins into this file.
    coffee = require('gulp-coffee'),  // import coffee script plugin
    browserify = require('gulp-browserify'),  // import browserify to load jquery and mustache libraries
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
]

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

/*
gulp.task('log', function() {
    gutil.log('Workflows are awesome')
});
*/