# Gulp WordPress Theme Workflow

Gulp workflow for WP theme development using [_s](http://underscores.me/).

## To Use:

1. Download your copy of _s and install in the "/wp-content/themes/" directory
2. Add the files in this respository to the theme folder
3. Run npm install
4. Set the variables at the top of gulfile.js (project URL, cssOutput)
5. Run the default task (gulp) to get started

### Features Include:

1. Browser refreshing using BrowserSync
2. Sass compilation, mapping, auto-prefixing
3. Javascript transpiling with Babel, minification

I am currently linting with ESLint in VSCode, but there is a gulp task (gulp eslint) that has been created to lint from the terminal. Basic linting rules have been set up in .eslintrc. [Configure the options](https://eslint.org/docs/user-guide/configuring) to suit your needs.

There is a task to optimize images (gulp imgs) using imageOptim, but it is hit or miss as to whether it works or not. Optimizing manually will probably yield better results.
