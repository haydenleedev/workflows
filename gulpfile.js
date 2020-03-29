var gulp = require('gulp'), // import gulp into this file.
    gutil = require('gulp-util'),  // import gulp-util plugins into this file.
    coffee = require('gulp-coffee');  // import coffee script plugin

var coffeeSources = ['components/coffee/tagline.coffee'];

gulp.task('coffee', async function() {
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true}) // send the contents of what we got from src method. send it to coffee variable. bare:true - complies javascript without putting it in a safty wrapper. refer: http://coffeescript.org/
            .on('error', gutil.log)) // send coffee script error information as a log to console.
        .pipe(gulp.dest('components/scripts')) // send the file to the destination once the process is done.
});

gulp.task('message', async function() {
    console.log("HTTP Server Started");
  });

/*
gulp.task('log', function() {
    gutil.log('Workflows are awesome')
});
*/