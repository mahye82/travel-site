// These modules could have been imported into App.js too, but for modules that just run straight out of the box without
// any further *Javascript* configuration by the dev, the convention is to put them in their own file, the Vendor.js.
// NOTE: Just because no additional JS code is necessary for them, it doesn't mean you don't need to edit HTML/CSS, etc.
// See individual module's docs.

/**
 * Picturefill is a polyfill. A polyfill a piece of code that provides the technology that the developer expects the
 * browser to provide natively. Picturefill is a polyfill which provides support for responsive images in legacy
 * browsers.
 * https://github.com/scottjehl/picturefill
 */
import 'picturefill';

/**
 * What is lazysizes? It's a lazy loader - i.e. only download assets as they become necessary. For example, images at
 * the bottom of a page aren't necessary when the page first loads.
 * https://github.com/aFarkas/lazysizes
 *
 * Where is the from keyword? https://stackoverflow.com/questions/42251503/javascript-es6-import-without-a-name
 */
import 'lazysizes';