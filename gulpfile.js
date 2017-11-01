// Set up some variables for your build
const projectURL = 'Your local domain here'; // URL of your local domain

const gulp = require('gulp'),
imageOptim = require('gulp-imageoptim'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS = require('gulp-clean-css'),
babel = require('gulp-babel'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
plumber = require('gulp-plumber'),
eslint = require('gulp-eslint'),
notify = require('gulp-notify'),
prettier = require('gulp-prettier'),
browserSync = require('browser-sync').create();

// Spin up a server
gulp.task('serve', () => {
browserSync.init({
	proxy: projectURL
});
});

// PHP/HTML
// Reload browser on changes to any files
gulp.task('php', () => {
gulp.src('./**/*.php').pipe(
	browserSync.reload({
		stream: true
	})
);
});

// Images
// Optimize images
gulp.task('imgs', () => {
return gulp
	.src('./imgs/*')
	.pipe(imageOptim.optimize())
	.pipe(gulp.dest('./imgs/opt'))
	.pipe(notify({ message: 'TASK: "imgs" completed', onLast: true }));
});

// CSS
// Compile Sass: create source maps, minify output, autoprefix, reload browser
gulp.task('css', () => {
gulp
	.src('./sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(
		sass({
			outputStyle: 'nested'
		}).on('error', sass.logError)
	)
	.pipe(
		autoprefixer({
			browsers: ['last 2 versions']
		})
	)
	.pipe(cleanCSS())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('.'))
	.pipe(notify({ message: 'TASK: "css" completed', onLast: true }))
	.pipe(
		browserSync.reload({
			stream: true
		})
	);
});

// Javascript
gulp.task('eslint', () => {
// ESLint ignores files with "node_modules" paths.
// So, it's best to have gulp ignore the directory as well.
// Also, Be sure to return the stream from the task;
// Otherwise, the task may end before the stream has finished.
return (
	gulp
		.src(['./js/*.js'])
		// eslint() attaches the lint output to the "eslint" property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		.pipe(
			notify({ message: 'TASK: "eslint" completed!', onLast: true })
		)
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failAfterError last.
		.pipe(eslint.failAfterError())
);
});

// Cleanup javascript formatting
gulp.task('prettier', () => {
gulp
	.src('./js/*.js')
	.pipe(prettier({
		tabWidth: 2,
		printWidth: 80,
		singleQuote: true
	}))
	.pipe(gulp.dest('./js'))
	.pipe(notify({ message: 'TASK: "prettier" completed', onLast: true }));
});

// Compile JS: Transpile with Babel, rename file, minify output, reload browser
gulp.task('js', () => {
gulp
	.src('./js/*.js')
	.pipe(plumber())
	.pipe(babel())
	.pipe(
		rename({
			suffix: '.min'
		})
	)
	.pipe(uglify())
	.pipe(gulp.dest('./js/min'))
	.pipe(notify({ message: 'TASK: "js" completed', onLast: true }))
	.pipe(
		browserSync.reload({
			stream: true
		})
	);
});

// Watch for changes and run tasks
gulp.task('watch', ['serve'], () => {
//gulp.watch('imgs/*', ['imgs']);
gulp.watch('sass/**/*.scss', ['css']);
gulp.watch('js/*.js', ['js']);
gulp.watch('**/*.php', ['php']);
//gulp.watch('./src/js/**/*.js', ['eslint']); Linting in code editor. Command can still be run from terminal if you want to lint there
});

// Default task
gulp.task('default', ['watch']);