// Set up some variables for your build
const projectURL = 'Your local domain here'; // URL of your local domain

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  babel = require('gulp-babel'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  browserSync = require('browser-sync').create();

// Spin up a server
gulp.task('serve', () => {
  browserSync.init({
    proxy: projectURL,
  });
});

// PHP/HTML
// Reload browser on changes to any files
gulp.task('php', () => {
  gulp
    .src('./**/*.php')
    .pipe(notify({ message: 'TASK: "php" completed', onLast: true }))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// CSS
// Compile Sass: create source maps, minify output, autoprefix, reload browser
gulp.task('css', () => {
  gulp
    .src('./sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'nested',
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
      })
    )
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
    .pipe(notify({ message: 'TASK: "css" completed', onLast: true }))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// Compile JS: Transpile with Babel, rename file, minify output, reload browser
gulp.task('js', () => {
  gulp
    .src('./js/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('./js/min'))
    .pipe(notify({ message: 'TASK: "js" completed', onLast: true }))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// Watch for changes and run tasks
gulp.task('watch', ['serve'], () => {
  gulp.watch('sass/**/*.scss', ['css']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('**/*.php', ['php']);
});

// Default task
gulp.task('default', ['watch']);
