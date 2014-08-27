'use strict';

var del = require('del');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
//var concat = require('gulp-concat');
//var template = require('gulp-template');
var uglify = require('gulp-uglify');
var _ = require('lodash');
var through = require('through2');

var concatPerso = function (fileName) {
    var firstFile = null;
    var fileContent = '';

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) return; // ignore
        if (file.isStream()) return this.emit('error', new gutil.PluginError('gulp-concat',  'Streaming not supported'));

        if (!firstFile) {
            firstFile = file;
        }

        fileContent += file.contents.toString();
        cb();
    }, function () {
        if (firstFile) {
            var returnFile = firstFile.clone();

            returnFile.path = path.join(firstFile.base, fileName);
            returnFile.contents = new Buffer(fileContent);

            this.push(returnFile);
        }
    });
};

var templatePerso = function (infos) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) return; // ignore
        if (file.isStream()) return this.emit('error', new gutil.PluginError('gulp-concat',  'Streaming not supported'));

        file.contents = new Buffer(_.template(file.contents.toString())(infos));

        this.push(file);
        cb();
    });
};

gulp.task('clean', function(cb) {
    del(['dist'], cb);
});

gulp.task('compile', function () {
    gulp.src(['www/*.css', 'www/*.html'])
        .pipe(templatePerso({
            scripts: '<script src="todo.js"></script>'
        }))
        .pipe(gulp.dest('dist/'));

    gulp.src([
        'bower_components/lodash/dist/lodash.min.js',
        'bower_components/angular/angular.min.js',
        'www/todo.js'])
        .pipe(concatPerso('todo.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', function () {
    gulp.start('clean');
    gulp.start('compile');
});