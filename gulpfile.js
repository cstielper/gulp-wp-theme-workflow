/* eslint-disable */
const projectURL = 'http://wordpress-development.test/'; // URL of your local domain

const gulp = require( 'gulp' ),
	newer = require( 'gulp-newer' ),
	plumber = require( 'gulp-plumber' ),
	notify = require( 'gulp-notify' ),
	sass = require( 'gulp-dart-sass' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	babel = require( 'gulp-babel' ),
	uglify = require( 'gulp-uglify-es' ).default,
	rename = require( 'gulp-rename' ),
	browserSync = require( 'browser-sync' ).create();

const errorHandler = ( r ) => {
	notify.onError( '❗️❗️❗️  ERROR: <%= error.message %>' )( r );
};

// Spin up a server
gulp.task( 'serve', () => {
	browserSync.init( {
		proxy: projectURL,
	} );
} );

// Hot reloading
const reload = ( done ) => {
	browserSync.reload();
	gulp
		.src( '.' )
		.pipe( notify( { message: '✅ 👍🏼 ✅  Reloading...', onLast: true } ) );
	done();
};

// Notify when file is changed
gulp.task( 'php', () =>
	gulp
		.src( './**/*.php' )
		.pipe( notify( { message: '✅ 👍🏼 ✅  Completed Task: "php"', onLast: true } ) )
		.pipe( browserSync.stream() )
);

// Compile Sass: Create sourcemaps, minify output, autoprefix for front-end CSS
gulp.task( 'theme-css', () =>
	gulp
		.src( './sass/**/*.scss' )
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps.init() )
		.pipe(
			sass( {
				outputStyle: 'compressed',
			} ).on( 'error', sass.logError )
		)
		.pipe(
			autoprefixer()
		)
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( '.' ) )
		.pipe( notify( { message: '✅ 👍🏼 ✅  Completed Task: "theme-css"', onLast: true } ) )
		.pipe( browserSync.stream() )
);

// Compile Sass: Create sourcemaps, minify output, autoprefix for editor CSS
gulp.task( 'editor-css', () =>
	gulp
		.src( './editor-styles/**/*.scss' )
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps.init() )
		.pipe(
			sass( {
				outputStyle: 'compressed',
			} ).on( 'error', sass.logError )
		)
		.pipe(
			autoprefixer()
		)
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( '.' ) )
		.pipe( notify( { message: '✅ 👍🏼 ✅  Completed Task: "editor-css"', onLast: true } ) )
		.pipe( browserSync.stream() )
);

// Compile Sass: Create sourcemaps, minify output, autoprefix for ACF Blocks
gulp.task( 'acf-blocks-css', () =>
	gulp
		.src( './acf-blocks/**/*.scss' )
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps.init() )
		.pipe(
			sass( {
				outputStyle: 'compressed',
			} ).on( 'error', sass.logError )
		)
		.pipe(
			autoprefixer()
		)
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( ( file ) => file.base ) )
		.pipe(
			notify( {
				message: '✅ 👍🏼 ✅  Completed Task: "acf-blocks-css"',
				onLast: true,
			} )
		)
		.pipe( browserSync.stream() )
);

// Compile JS: Create sourcemaps, transpile with Babel, rename file, minify output for theme
gulp.task( 'theme-js', () =>
	gulp
		.src( './js/*.js' )
		.pipe( newer( './js/min' ) )
		.pipe( plumber( errorHandler ) )
		.pipe( sourcemaps.init() )
		.pipe(
			babel()
		)
		.pipe(
			rename( {
				suffix: '.min',
			} )
		)
		.pipe( uglify() )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './js/min' ) )
		.pipe( notify( { message: '✅ 👍🏼 ✅   Completed Task: "theme-js"', onLast: true } ) )
		.pipe( browserSync.stream() )
);

// Compile JS: Transpile with Babel, rename file, minify output for ACF blocks
gulp.task( 'block-js', () =>
	gulp
		.src( [ './acf-blocks/**/*.js', '!./acf-blocks/**/*.min.js' ] )
		.pipe( newer( './' ) )
		.pipe( plumber( errorHandler ) )
		.pipe(
			babel()
		)
		.pipe(
			rename( {
				suffix: '.min',
			} )
		)
		.pipe( uglify() )
		.pipe( gulp.dest( ( file ) => file.base ) )
		.pipe( notify( {
			message: '✅ 👍🏼 ✅   Completed Task: "block-js"', onLast: true } ) )
		.pipe( browserSync.stream() )
);

// Default task
gulp.task(
	'default',
	gulp.parallel( 'serve', () => {
		gulp.watch( '**/*.php', gulp.series( 'php', reload ) );
		gulp.watch( 'sass/**/*.scss', gulp.series( 'theme-css', 'editor-css', reload ) );
		gulp.watch( 'editor-styles/**/*.scss', gulp.series( 'editor-css', reload ) );
		gulp.watch( 'acf-blocks/**/*.scss', gulp.series( 'acf-blocks-css', reload ) );
		gulp.watch( 'js/*.js', gulp.series( 'theme-js', reload ) );
		gulp.watch( [ 'acf-blocks/**/*.js', '!acf-blocks/**/*.min.js' ], gulp.series( 'block-js', reload ) );
		gulp
			.src( '.' )
			.pipe( notify( { message: '✅ 👍🏼 ✅  Starting...', onLast: true } ) );
	} )
);
