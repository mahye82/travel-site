const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import');

// Another task. Invoking 'gulp styles' from the terminal will run this task, but it is also invoked by the gulp 'watch'
// task.
//
// It takes './app/assets/styles/styles.css' as the source file for a stream that is piped to the post-CSS preprocessor
// which applies a variety of PostCSS plugins. Then this is piped again to a destination folder'./app/temp/styles'.
//
// In short, we're taking our styles.css which contains invalid CSS like variables, nesting (as well as valid but
// unvendorized rules, importing CSS files). We convert that into valid CSS and spewing out the valid CSS file into
// another folder. That new CSS file is what's used in index.html.
//
// https://gulpjs.org/api#gulpsrcglobs-options
// https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
// https://github.com/postcss
//
gulp.task('styles', function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
        .pipe(gulp.dest('./app/temp/styles'));
});