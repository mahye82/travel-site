const gulp = require('gulp'),
    watch = require('gulp-watch');

// https://github.com/gulpjs/gulp/blob/v3.9.1/docs/API.md#gulptaskname--deps-fn
// Define the default task. Invoking 'gulp' from the terminal will run this task.
gulp.task('default', function () {
    console.log("Hooray you created a gulp task");
});

// Another task. Invoking 'gulp html' from the terminal will run this task.
gulp.task('html', function () {
    console.log("Imagine something useful being done to your HTML here.");
});

// Another task. Invoking 'gulp styles' from the terminal will run this task.
gulp.task('styles', function () {
    console.log("Imagine SASS or PostCSS tasks running here.");
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