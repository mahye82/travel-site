// What is lazysizes? It's a lazy loader - i.e. only download assets as they become necessary. For example, images at
// the bottom of a page aren't necessary when the page first loads.
// https://github.com/aFarkas/lazysizes
//
// This module could have been imported into App.js too, but for modules that just run straight out of the box without
// any further Javascript configuration by the dev, the convention is to put them in their own file, the Vendor.js
//
// Where is the from keyword? https://stackoverflow.com/questions/42251503/javascript-es6-import-without-a-name
import 'lazysizes';