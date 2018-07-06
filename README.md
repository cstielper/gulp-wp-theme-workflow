# Gulp WordPress Theme Workflow

Gulp workflow for WP theme development using [_s](http://underscores.me/).

## Features:

1. Browser refreshing using BrowserSync
2. Sass compilation, mapping, auto-prefixing
3. Javascript minification. Transpiling with Babel.
4. JS linting with ES Lint through VSCode.

## Installation:

1. Download your copy of _s and install in the "/wp-content/themes/" directory
2. Add the files in this respository to the theme folder (you can omit README.md)
3. Run npm install
4. Set the URL of your local environment in the "projectURL" variable at the top of [gulpfile.js](gulpfile.js)
5. Run the default task (gulp) to get started
