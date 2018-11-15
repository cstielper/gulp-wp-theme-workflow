/* eslint-disable */
const projectURL = 'http://wordpress-development.test/'; // URL of your local domain

const gulp = require('gulp'),
  newer = require('gulp-newer'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  babel = require('gulp-babel'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync').create();

const errorHandler = r => {
  notify.onError('❗️❗️❗️  ERROR: <%= error.message %>')(r);
};

// Spin up a server
gulp.task('serve', () => {
  browserSync.init({
    proxy: projectURL,
  });
});

// Hot reloading
const reload = done => {
  browserSync.reload();
  gulp
    .src('.')
    .pipe(notify({ message: '✅ 👍 ✅  Reloading...', onLast: true }));
  done();
};

// PHP/HTML
gulp.task('php', () =>
  gulp
    .src('./**/*.php')
    .pipe(notify({ message: '✅ 👍 ✅  Completed Task: "php"', onLast: true }))
    .pipe(browserSync.stream())
);

// Compile Sass: Create sourcemaps, minify output, autoprefix
gulp.task('css', () =>
  gulp
    .src('./sass/**/*.scss')
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        grid: true,
        browsers: ['last 2 version'],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.'))
    .pipe(notify({ message: '✅ 👍 ✅  Completed Task: "css"', onLast: true }))
    .pipe(browserSync.stream())
);

// Compile JS: Create sourcemaps, transpile with Babel, rename file, minify output
gulp.task('js', () =>
  gulp
    .src('./js/*.js')
    .pipe(newer('./js/min'))
    .pipe(plumber(errorHandler))
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['last 2 versions'],
              },
            },
          ],
        ],
      })
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./js/min'))
    .pipe(notify({ message: '✅ 👍 ✅   Completed Task: "js"', onLast: true }))
    .pipe(browserSync.stream())
);

// Default task
gulp.task(
  'default',
  gulp.parallel('serve', () => {
    gulp.watch('**/*.php', gulp.series('php', reload));
    gulp.watch('sass/**/*.scss', gulp.series('css', reload));
    gulp.watch('js/*.js', gulp.series('js', reload));
    gulp
      .src('.')
      .pipe(notify({ message: '✅ 👍 ✅  Starting...', onLast: true }));
  })
);
