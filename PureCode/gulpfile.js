'use strict';

const gulp = require('gulp');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const watch = require('gulp-watch');
const watchSass = require("gulp-watch-sass");
const browserSync = require('browser-sync').create();

// Optimize js-files
gulp.task('jsCompile', () => {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});

// SASS Compilation
gulp.task('sassCompile', () =>  {
  gulp.src(['src/scss/*.scss', '!src/scss/_components/*'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 16 versions'],
        cascade: false
    }))
    .pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// Start All Comands
gulp.task('build', ['jsCompile', 'sassCompile']);

// Gulp Watching
gulp.task('watch', () => {
  gulp.watch('src/js/*.js', ['jsCompile']);
  gulp.watch('src/scss/*.scss', ['sassCompile']);
});

gulp.task('default', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    scrollProportionally: true,
    notify: false,
    open: "local"
  })
  gulp.watch('src/js/*.js', ['jsCompile']);
  gulp.watch('src/scss/*.scss', ['sassCompile']);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/*.js', browserSync.reload);
});
