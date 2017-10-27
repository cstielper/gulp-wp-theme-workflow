# Gulp WordPress Theme Workflow

Gulp workflow for WP theme development using [_s](http://underscores.me/).

## To Use:

1. Download your copy of _s and install in the "/wp-content/themes/" directory
2. Add the files in this respository to the theme folder (you can omit README.md)
3. Run npm install
4. Set the variables at the top of gulfile.js (project URL, cssOutput)
5. Run the default task (gulp) to get started

### Features Include:

1. Browser refreshing using BrowserSync
2. Sass compilation, mapping, auto-prefixing
3. Javascript formatting with prettier, transpiling with Babel, minification
4. JS linting with ES Lint. Currently, only using recommened rules and console warning.

**Prettier extension in VS Code should be disabled while working on project.**

There is a task to optimize images (gulp imgs) using imageOptim, but it is hit or miss as to whether it works or not. Optimizing manually will probably yield better results.
