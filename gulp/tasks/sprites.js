const gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite');             // https://github.com/jkphl/gulp-svg-sprite

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
    mode: {
        css: {                      // Activate the «css» mode for generating the sprite file
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

// A task that can be run from the command line by invoking gulp createSprite. It creates an image sprite from the
// SVG icon files. This task is useful because it decreases load time when the user only needs to download one
// image sprite file for all the icons when visiting the website.
// To better understand the concept of sprites - read this article: https://css-tricks.com/css-sprites/
gulp.task('createSprite', function () {
    // Requires a return statement because .src is async, and we want gulp to be aware when these operations complete.
    // This task takes as a source, the SVG files in the icons folder (even if they are located in subdirectories, hence
    // the **). It then pipes the stream from the source to the gulp-svg-sprite package. This is then piped to a
    // destination folder.
    return gulp.src('./app/assets/images/icons/**/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app/temp/sprite'));
});
