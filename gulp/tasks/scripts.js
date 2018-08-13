const gulp = require('gulp'),
    webpack = require('webpack');

// A task that can be run from the command line by invoking 'gulp scripts'. It bundles all the files in our
// /app/assets/scripts files together, which are Javascript files that use modules and require statements. Since
// web browsers don't recognise these statements or modularization, webpack is used to bundle all the files together.
// How does webpack know which files to bundle? The webpack.config.js file points to the entry file and defines the
// output file's location.
gulp.task('scripts', function (callback) {
    // Run webpack, but point to the webpack.config.js file, relative to this file.
    webpack(require('../../webpack.config'), function (err, stats) {
        // If there's an error, we want to gracefully handle it.
        if (err) {
            console.log(err.toString());
        }

        console.log("Webpack has completed. STATS:");
        console.log(stats.toString());                  // Webpack stats printed out
        // When webpack is complete, we want gulp to be aware it has finished running, so we invoke the
        // gulp callback
        callback();
    });
});