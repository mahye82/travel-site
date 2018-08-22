const gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),             // https://github.com/jkphl/gulp-svg-sprite
    rename = require('gulp-rename'),
    del = require('del'),                               // https://gulpjs.org/recipes/delete-files-folder
    svg2png = require('gulp-svg2png');                  // https://github.com/akoenig/gulp-svg2png

// A config object required for using the gulp-svg-sprite package. This package transforms a bunch of SVG files into an
// image sprite. But it does more than that.
//
// How do we make use of the sprite SVG file in our CSS? Working out the exact width/length for each icon in the sprite
// file is possible, but would be tedious to manually write the CSS to add this to our app. Fortunately, we can
// configure gulp-svg-sprite to automatically produce the CSS files to target each icon in the sprite file too! However,
// this requires providing a Mustache template file to specify what kind of data we want in our final generated CSS
// file.
// https://github.com/jkphl/gulp-svg-sprite
const config = {
    // Add some padding between the different icons in the generated sprite image. This is useful because icons
    // occasionally end up displaying the edge of other icons unintentionally. A little gap prevents artifacts like
    // this.
    shape: {
      spacing: {
          padding: 1
      }
    },
    mode: {
        css: {                                      // Activate the «css» mode for generating the sprite file
            variables: {
                // A function used in the ./gulp/templates/sprite.css to replace '.svg' in the filename with '.png'
                replaceSvgWithPng: function () {
                    return function (sprite, render) {
                        // sprite is the dynamic filename of the sprite - for example, sprite-69f19c2e.svg
                        // render is a method that gives us access to the CSS in the template.
                        //
                        // Essentially, the line below goes into the ./gulp/templates/sprite.css and fiddles with the
                        // string of the sprite filename, and ensures it has a '.png' ending.
                        return render(sprite).split('.svg').join('.png');
                    };
                }
            },
            sprite: 'sprite.svg',                   // The filename for the sprite we want to generate
            render: {
                css: {
                    // Render the CSS files for making use of the generated sprite file, by using a Mustache template
                    // file.
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
};

// A task that can be run from the command line by invoking 'gulp beginClean'. However, it is usually run as the first
// step in the 'gulp icons' task. The other tasks run by gulp icons automatically produce certain files. This task's
// job is to delete the old files and folders, so that we don't have redundant copies of files lying around.
gulp.task('beginClean', function () {
    return del([
        './app/temp/sprite',
        './app/assets/images/sprites'
    ]);
});

// A task that can be run from the command line by invoking 'gulp createSprite'. It creates an image sprite from the
// SVG icon files. This task is useful because it decreases load time when the user only needs to download one
// image sprite file for all the icons when visiting the website.
// To better understand the concept of sprites - read this article: https://css-tricks.com/css-sprites/
//
// The second argument lists dependencies - i.e. beginClean has to run before createSprite can run.
gulp.task('createSprite', ['beginClean'], function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    // This task takes as a source, the SVG files in the icons folder (even if they are located in subdirectories, hence
    // the **). It then pipes the stream from the source to the gulp-svg-sprite package. This is then piped to a
    // destination folder.
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite'));
});

// A task that can be run from the command line by invoking 'gulp createPngCopy'. However, it is usually run as a step
// in the 'gulp icons' task. It takes a previously created SVG sprite and creates a PNG copy of the sprite. This is
// to support those minority of browsers that don't support SVGs.
//
// The second argument lists dependencies - i.e. createSprite has to run before createPngCopy can run.
gulp.task('createPngCopy', ['createSprite'], function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    // This task takes the SVG sprite as a source, pipes the stream to the gulp-svg2png package. This is then piped
    // to a destination folder.
    return gulp.src('./app/temp/sprite/css/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./app/temp/sprite/css'));
});

// A task that can be run from the command line by invoking 'gulp copySpriteCSS'.
// The createSprite task creates an image sprite as well as generates a CSS file for finding individual icons in that
// image sprite. However, the file is placed in a temporary directory.
// This task copies the CSS file to another directory.
// The second argument lists dependencies - i.e. createSprite has to run before copySpriteCSS can run.
gulp.task('copySpriteCSS', ['createSprite'], function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    // This task takes the auto-generated sprite CSS file as a source. It pipes this file as a stream to the gulp-rename
    // package. This stream is then piped to the destination directory.
    return gulp.src('./app/temp/sprite/css/*.css')
        .pipe(rename('_sprite.css'))                            // The file will be renamed to _sprite.css
        .pipe(gulp.dest('./app/assets/styles/modules/'));
});

// A task that can be run from the command line by invoking 'gulp copySpriteGraphic'. It takes as a source any SVG and
// PNG files in the CSS folder. It pipes them as a stream to the sprites destination folder.
// The second argument lists dependencies - i.e. createPngCopy has to run before copySpriteGraphic can run.
gulp.task('copySpriteGraphic', ['createPngCopy'], function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
        .pipe(gulp.dest('./app/assets/images/sprites'));
});

// A task that can be run from the command line by invoking 'gulp endClean'. However, it is usually run as the last
// step in the 'gulp icons' task. The other tasks run by gulp icons automatically produce certain files. During this
// sequence files are placed in a temporary folder. The job of this task is to delete that temporary folder, so we
// we don't have useless files in the source files for our app.
//
// The second argument lists dependencies - i.e. we only want endClean to run AFTER copySpriteGraphic and copySpriteCSS
// have finished making copies from the temp folder to their proper destination.
gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {
    return del([
        './app/temp/sprite'
    ]);
});

// A task that can be run from the command line by invoking 'gulp icons'.
//
// The second argument is a set of tasks that should be run. These tasks would actually execute simultaneously,
// but since we want some other tasks to run AFTER createSprite, we had to add it as a dependency in the definitions
// for the other tasks (see above). Similarly, we don't want createSprite to begin before the beginClean task has
// finished, so we added beginClean as a dependency in the defintion for createSprite.
//
// (NOTE: This is how the lesson did it. The truth is that the createSprite is redundant here because we made it a
// dependency of the other tasks listed below.)
gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);