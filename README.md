# Gulp WordPress Theme Workflow

![Version 3.2.0](https://img.shields.io/badge/Version-3.2.0-brightgreen.svg)

Gulp workflow for WP theme development using [_s](http://underscores.me/).

**IMPORTANT: This workflow has been updated to use Gulp 4. You will need to install the Gulp CLI before using:**

`
npm install gulp-cli -g
`

## Features:

1. Browser refreshing using BrowserSync
2. Sass compilation, mapping, auto-prefixing
3. Javascript transpiling with Babel, minification, mapping
4. JS linting with ES Lint through VSCode.

## Installation:

1. Download your copy of _s and install in the "/wp-content/themes/" directory
2. Add the files in this respository to the theme folder (you can omit README.md)
3. Run npm install
4. Set the URL of your local environment in the "projectURL" variable at the top of [gulpfile.js](gulpfile.js)
5. Run the default task `gulp` to get started

## Organization:
1. Work out of the "sass" and "js" folders to maintain theme CSS/JS as normal.
2. For Gutenberg editor styles, create a folder called "editor-styles" and place your scss files there. They will compile a stylesheet to the root of the theme.
3. For ACF blocks, create a folder named "acf-blocks" and add directories for individual blocks. SCSS and JS files will be processed to the same folder as the block.

## Notes:
You should be able to use the NPM scripts provided by _s for individual tasks.

- `npm run lint:scss` : checks all front-end SASS files against [CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).
- `npm run lint:editor-scss` : checks all block editor SASS files against [CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).
- `npm run lint:acf-blocks-scss` : checks all ACF block SASS files against [CSS Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/css/).
- `npm run lint:js` : checks all front-end JavaScript files against [JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/).
- `npm run lint:acf-blocks-js` : checks all ACF block JavaScript files against [JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/).
- `npm run bundle` : generates a .zip archive for distribution, excluding development and system files.

If you are using these, they may need to be altered slightly for your project structure.