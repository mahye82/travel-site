// A file for telling Webpack how to bundle our modules together, and produce a single JS file that can be used in
// web browsers.
//
// To run webpack, first make sure you have it installed with 'npm install webpack'. Then to run the build, invoke
// 'npx webpack --config webpack.config.js'.

// Get the Node.js path module. https://nodejs.org/api/path.html
const path = require("path");

module.exports = {
    // The first file we want webpack to look for to start bundling modules
    entry: "./app/assets/scripts/App.js",
    output: {
        // Make use of Node.js' path.resolve function to produce an absolute path for our output file, which will be
        // called App.js.
        // https://nodejs.org/docs/latest/api/modules.html#modules_dirname
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "App.js"
    }
};