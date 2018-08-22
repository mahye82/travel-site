const gulp = require('gulp'),
    modernizr = require('gulp-modernizr');

// A task that can be run by typing 'gulp modernizr' in the terminal. This task generates a custom-built modernizr file
// which can be used to check if the browser has support for the features we make use of in our code.
//
// modernizr has the ability to test browsers for hundreds of features, like whether they have support for SVG, flexbox,
// animations, etc. However, the more features we test for, the larger the outputted modernizr.js file becomes, which
// slows things down for website users. Gulp-modernizr allows us to write a smaller, custom version of modernizr, that
// only includes the code for the features we want to test for. As a result, our outputted modernizr.js file will be
// as small as possible.
//
// So how does gulp-modernizr know which features we need to test for? We simply provide our app's CSS and JS files as
// a source, and modernizr is intelligent enough to figure out which features should be tested for. After piping the
// CSS and JS files to modernizr as a source, it generates a lightweight modernizr.js file which we pipe to a
// destination folder.
//
// (In our app, we're most concerned with testing for SVG support. If a browser doesn't have SVG support, we'll need to
// use the fallback PNG sprite files. The modernizr.js file we generate in this task will help us figure out which
// type of assets to serve.)
gulp.task('modernizr', function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
        .pipe(modernizr({                                       // a Config object
            "options": ["setClasses"]
        }))
        .pipe(gulp.dest('./app/temp/scripts/'));
});