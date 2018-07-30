const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssvars = require('postcss-simple-vars'),
    nested = require('postcss-nested'),
    cssImport = require('postcss-import');

// A gulp task. Invoking 'gulp styles' from the terminal will run this task, but it is also invoked by the gulp 'watch'
// task.
//
// It takes './app/assets/styles/styles.css' as the source file for a stream that is piped to the post-CSS preprocessor
// which applies a variety of PostCSS plugins. Then this is piped again to a destination folder'./app/temp/styles'.
//
// In short, we're taking our original CSS files which contain stuff that is invalid CSS like variables, nested CSS
// rules (as well as valid CSS like unvendorized styles and import statements). We convert that into valid CSS and spew
// out the valid CSS file into another folder (./app/temp/styles/). That new CSS file is what's used in index.html.
//
// https://gulpjs.org/api#gulpsrcglobs-options
// https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
// https://github.com/postcss
//
gulp.task('styles', function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    return gulp.src('./app/assets/styles/styles.css')

        .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))

        // In the event of an error during PostCSS compilation, we want 'this' (the stream that was piped) to tell gulp
        // that it should come to a graceful end. It did its best, but is now finished. This will mean the next pipe
        // step is skipped. However, if the 'styles' task was called from another task, execution will continue there.
        .on('error', function (errorInfo) {
            console.log(errorInfo.toString());
            this.emit('end');
        })

        .pipe(gulp.dest('./app/temp/styles'));
});