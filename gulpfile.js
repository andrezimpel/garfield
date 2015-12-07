var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-ruby-sass');


// ------------------------------------------


// paths
var paths = {
  scripts: ['src/js/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src([
    './src/js/garfield.js'
    ])
    .pipe(concat('garfield.js'))
    // This will output the non-minified version
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulp.dest('./'))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulp.dest('./'));
});


// compile sass to css and store it in dist
gulp.task('sass', function () {
  sass(['./src/scss/garfield.scss'])
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  // .pipe(autoprefixer({
  //   browsers: ['last 2 versions'],
  //   cascade: false
  // }))
  .pipe(gulp.dest('./dist/css'));
});

// ------------------------------------------


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'sass']);
