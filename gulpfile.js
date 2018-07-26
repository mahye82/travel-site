const gulp = require('gulp'),
    watch = require('gulp-watch'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import');

// https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md#gulptaskname--deps-fn
// Define the default task. Invoking 'gulp' from the terminal will run this task.
gulp.task('default', function () {
    console.log("Hooray you created a gulp task");
});

// Another task. Invoking 'gulp html' from the terminal will run this task.
gulp.task('html', function () {
    console.log("Imagine something useful being done to your HTML here.");
});

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

// A task which makes use of the gulp-watch plugin. It watches a file for changes (like saving the file), and then
// invokes the callback when some change occurs. Invoking 'gulp watch' will run this task. (Note: a task that makes use
// of gulp-watch won't end until we tell it to stop.)
gulp.task('watch', function () {
    // Use gulp-watch to watch the index.html file and run the callback when any changes occur.
    watch('./app/index.html', function () {
        // Start the 'html' task.
        gulp.start('html');
    });

    // Use gulp-watch to watch any CSS file found in the styles folder (including subdirectories).
    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('styles');
    })
});