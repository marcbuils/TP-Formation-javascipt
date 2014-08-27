'use strict';

var del = require('del');
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var exorcist = require('exorcist');
var buffer = require('vinyl-buffer');

gulp.task('clean-dev', function(cb) {
    del(['dev'], cb);
});

gulp.task('clean-dist', function(cb) {
    del(['dist'], cb);
});

gulp.task('compile-dev', function () {
    gulp.src(['app/styles/*.css', 'app/*.html'])
        .pipe(gulp.dest('dev/'));

    browserify('./app/scripts/bootstrap.js', {
        debug: true
    })
        .bundle()
        .pipe(exorcist('./dev/bootstrap.js.map'))
        .pipe(source('bootstrap.js'))
        .pipe(gulp.dest('dev/'));
});

gulp.task('compile-dist', ['clean-dist'], function () {
    gulp.src(['app/styles/*.css', 'app/*.html'])
        .pipe(gulp.dest('dist/'));

    browserify('./app/scripts/bootstrap.js')
        .bundle()
        .pipe(source('bootstrap.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', ['compile-dev', 'compile-dist'], function () {
    gulp.watch('app/**/*', ['compile-dev']);
    nodemon({
        script: 'server/server.js',
        ext: 'js',
        ignore: ['app/**/*', 'gulpfile.js']
    })
    .on('restart', function () {
        console.log('restarted!')
    });
});

gulp.task('default', ['watch']);