'use strict';

const gulp = require('gulp');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

// JS Compilation
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
    .pipe(browserSync.stream());
});

// SASS Compilation
gulp.task('sassCompile', () =>  {
  gulp.src(['src/scss/*.scss', '!src/scss/_components/*'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 16 versions'],
        cascade: false
    }))
    .pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
    .pipe(sourcemaps.write('.'))
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
});
