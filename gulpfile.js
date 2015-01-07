var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    to5 = require('gulp-6to5'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

gulp.task('lint', function () {
    return gulp
        .src(['./src/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('bundle', ['lint'], function() {
    var bundler = browserify({
        entries: ['./src/js/main.js'],
        debug: true
    });

    return bundler
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(to5())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
    return gulp.src('./src/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    gulp.watch(['./src/js/*.js'], ['bundle']);
    gulp.watch(['./src/css/*.scss'], ['sass']);
});
