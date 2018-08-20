// A file for telling Webpack how to bundle our modules together, and produce a handful of JS files (that make use of
// the ES6 import keyword to maintain modularity). The bundled output files can then be used in web browsers (otherwise
// they don't know how to handle the import keyword). This file also tells Webpack to use the Babel loader to transpile
// the JS ES6 files we've written.
//
// To run webpack, first make sure you have it installed with 'npm install webpack'. Then to run the build, invoke
// 'npx webpack --config webpack.config.js'.

// Get the Node.js path module. https://nodejs.org/api/path.html
const path = require("path");

module.exports = {
    // The first files we want webpack to look for to start bundling modules
    entry: {
      App: "./app/assets/scripts/App.js",
      Vendor: "./app/assets/scripts/Vendor.js"
    },
    output: {
        // Make use of Node.js' path.resolve function to produce an absolute path for our output files, which will use
        // their original filenames - in this case App.js and Vendor.js.
        // https://nodejs.org/docs/latest/api/modules.html#modules_dirname
        path: path.resolve(__dirname, "./app/temp/scripts"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                // babel-loader helps us integrate babel with webpack. https://github.com/babel/babel-loader
                loader: "babel-loader",
                query: {
                    presets: ['es2015']     // Make use of the ES2015 standards when transpiling
                },
                test: /\.js$/,              // Only use the babel-loader on Javascript files. (This is a regex)
                exclude: /node_modules/     // We only need to run babel on our own JS files
            }
        ]
    }
};