const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),            // https://github.com/sindresorhus/gulp-imagemin
    del = require('del'),                           // https://www.npmjs.com/package/del
    usemin = require('gulp-usemin'),                // https://github.com/zont/gulp-usemin - DEPRECATED - NEEDS UPDATE!
    rev = require('gulp-rev'),                      // https://github.com/sindresorhus/gulp-rev
    cssnano = require('gulp-cssnano'),              // https://github.com/ben-eb/gulp-cssnano
    uglify = require('gulp-uglify'),                // https://www.npmjs.com/package/gulp-uglify
    browserSync = require('browser-sync');          // https://browsersync.io/docs/gulp

// This gulp task is NOT a dependency of the 'gulp build' task. It can be run by invoking 'gulp previewDist' in the
// terminal. This task spins up a local server and opens the browser, allowing the developer to see the dist copy (i.e.
// the non-development production build) of the app in action.
gulp.task('previewDist', function () {
    // browser-sync is a package that can be used to refresh the browser whenever you want. In this case, we want to
    // auto-refresh the browser whenever we've made changes to the source files.
    browserSync.init({
        // By default, whenever browser-sync refreshes the page, it'll produce a temporary little black box on the web
        // page explaining that it's connected to browser-sync. This notify prop gets rid of it.
        notify: false,
        // Specify where our website lives (i.e. where index.html is), so that browser-sync can set up a little server.
        server: {
            baseDir: 'dist'
        }
    });
});

// This gulp task is a dependency of the 'gulp build' task. It is responsible for deleting the dist folder and its
// contents. We do this so that we start from a blank state before any of the other build tasks run.
gulp.task('deleteDistFolder', function () {
    return del('./dist');
});

// This gulp task is a dependency of the 'gulp build' task. It is responsible for copying over any other files that the
// other build tasks do not. For example, if we had some random folder containing image files (for some reason), this
// task would ensure that it gets copied over to the dist.
//
// The second argument is the list of dependencies for this task, i.e. the tasks we want to run before this one.
gulp.task('copyGeneralFiles', ['deleteDistFolder'], function () {
    // A list of paths that will be used by gulp.src below
    const pathsToCopy = [
        './app/**/*',                   // Copy everything in app's subdirectories
        '!./app/index.html',            // But exclude index.html, since gulp task 'usemin' copies/compresses/revs this
        '!./app/assets/images/**',      // Exclude everything in images, since gulp task 'optimizeImages' handles this
        '!./app/assets/styles/**',      // Exclude everything in styles, since gulp task 'usemin' handles this
        '!./app/assets/scripts/**',     // Exclude everything in scripts, since gulp task 'usemin' handles this
        '!./app/temp',                  // Exclude everything in temp
        '!./app/temp/**'
    ];

    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest('./dist'));
});

// This gulp task is a dependency of the 'gulp build' task. It is responsible for compressing the image files in the
// app folder and copying them over to the dist folder.
//
// Gulp to take as source as everything in the ./app/assets/images/ folder except the /icons folder, and pipes it as
// a stream to the gulp-imagemin module. imagemin optimises the images using the given plugin options. Then the result
// is streamed to the destination directory ./dist/assets/images.
//
// The second argument is the list of dependencies for this task, i.e. the tasks we want to run before this one. We
// want 'deleteDistFolder' to have run first so that we're starting with a blank slate. We also want to have a fresh
// rebuild of our image sprites before they're optimized and copied over to the ./dist/assets/images folder.
gulp.task('optimizeImages', ['deleteDistFolder', 'icons'], function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    // '!' indicates files that we want to exclude from those added by * wildcards.
   return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!././app/assets/images/icons/**/*'])
       .pipe(imagemin({                         // plugin options
           progressive: true,                   // Optimises images using lossless optimisers like svgo and optipng
           interlaced: true,                    // Interlaced GIFs
           multipass: true                      // Runs multiple passes on SVGs -
                                                //          https://www.amberddesign.com/how-to-optimize-an-svg-file/
       }))
       .pipe(gulp.dest("./dist/assets/images"));
});

// This gulp task is a dependency of the 'gulp build' task. It is responsible for making copies of the HTML, CSS and JS
// files, compressing and revisioning them, and then moving the copies to the dist folder.
//
// The second argument is the list of dependencies for this task, i.e. the tasks we want to run before this one. We
// want 'deleteDistFolder' to have run first so that we're starting with a blank slate. But we also want 'styles' and
// 'scripts' gulp tasks to run first, so that we really do have the most updated CSS and JS before copying them to dist.
gulp.task('usemin', ['deleteDistFolder', 'styles', 'scripts'], function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    return gulp.src('./app/index.html')             // Take the index.html as a source - which also contains comments
                                                    // that are used by gulp-usemin.
        .pipe(usemin({
            css: [                                  // Filters we want to apply to our CSS
                function () { return rev() },       // Revision the CSS, i.e. styles.css -> styles-45109b.css
                function () { return cssnano() }    // Compress the CSS
            ],
            js: [                                   // Filters we want to apply to our CSS
                function () { return rev() },       // Revision the Javascript files
                function () { return uglify() }     // Compress the JS files
            ]
        }))
        .pipe(gulp.dest('./dist'));                 // Pipe the index.html to ./dist along with any files wrapped in
                                                    // usemin comments in the index.html
});

// This gulp task can be run by invoking 'gulp build' from the terminal. This task doesn't do anything itself - it
// just has a bunch of other task dependencies. Thus it's a shortcut for the terminal to run all the build tasks.
//
// Invoking 'gulp build' will create/update the dist directory - just the compressed production files needed for our
// server (not our organised, uncompressed dev/source files).
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);