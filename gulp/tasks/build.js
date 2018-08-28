const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),            // https://github.com/sindresorhus/gulp-imagemin
    del = require('del'),                           // https://www.npmjs.com/package/del
    usemin = require('gulp-usemin');                // https://www.npmjs.com/package/gulp-usemin

// This gulp task is a dependency of the 'gulp build' task. It is responsible for deleting the dist folder and its
// contents. We do this so that we start from a blank state before any of the other build tasks run.
gulp.task('deleteDistFolder', function () {
    return del('./dist');
});

// This gulp task is a dependency of the 'gulp build' task. It is responsible for compressing the image files in the
// app folder and copying them over to the dist folder.
//
// Gulp to take as source as everything in the ./app/assets/images/ folder except the /icons folder, and pipes it as
// a stream to the gulp-imagemin module. imagemin optimises the images using the given plugin options. Then the result
// is streamed to the destination directory ./dist/assets/images.
//
// The second argument is the list of dependencies for this task, i.e. the tasks we want to run before this one.
gulp.task('optimizeImages', ['deleteDistFolder'], function () {
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

// This gulp task is a dependency of the 'gulp build' task. It is responsible for making copies of the HTML and CSS
// files, compressing and revisioning them, and then moving the copies to the dist folder.
//
// The second argument is the list of dependencies for this task, i.e. the tasks we want to run before this one.
gulp.task('usemin', ['deleteDistFolder'], function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    return gulp.src('./app/index.html')
        .pipe(usemin())
        .pipe(gulp.dest('./dist'));
});

// This gulp task can be run by invoking 'gulp build' from the terminal. This task doesn't do anything itself - it
// just has a bunch of other task dependencies. Thus it's a shortcut for the terminal to run all the build tasks.
//
// Invoking 'gulp build' will create/update the dist directory - just the compressed production files needed for our
// server (not our organised, uncompressed dev/source files).
gulp.task('build', ['deleteDistFolder', 'optimizeImages', 'usemin']);