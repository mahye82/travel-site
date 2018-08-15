import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';   // Imports Waypoint class

class RevealOnScroll {
    constructor() {
        // Select DOM elements and store them as properties on an instance of RevealOnScroll
        this.itemsToReveal = $('.feature-item');
        // As soon as the page loads, items should be hidden
        this.hideInitially();
        // Since we only want to reveal an element once it has been scrolled to, we leverage the module 'waypoints'
        // to set this up
        this.createWaypoints();
    }

    /**
     * Since we want the items to be revealed only when we scroll to them, initially we want them to be hidden. This
     * method gives each item the class for HIDING them (i.e. makes its opacity 0).
     *
     * (The CSS class for revealing an item is added in the createWaypoints function.)
    */
    hideInitially() {
        this.itemsToReveal.addClass("reveal-item");
    }

    /**
     * Creates Waypoints for every element we've selected to be revealed when they are scrolled to.
     * // http://imakewebthings.com/waypoints/guides/getting-started/
     *
     * A Waypoint defines:
     * 1) element - The DOM element we want to watch for as we scroll down the page.
     * 2) handler - The function we want to fire when the DOM element we are watching is scrolled to.
     * 3) offset - An optional value. By default, waypoints only triggers the handler when the user has scrolled so
     *              that the element has reached the top of the viewport (0%). We can offset it so that the handler
     *              sooner. For example, if we want the handler to fire when the element is near the bottom of the
     *              viewport we could set the offset to 100%.
     */
    createWaypoints() {
        // itemsToReveal is a jQuery selection of some DOM elements. each() is a JQuery method:
        // http://api.jquery.com/jquery.each/
        this.itemsToReveal.each(function () {

            // jQuery's each function sets the value of the 'this' keyword to be the current element in the selection
            // that is being looped through.
            const currentItem = this;

            new Waypoint({
                element: currentItem,
                handler: function() {
                    // Give the item the CSS class that will reveal it (i.e. increase its opacity)
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                offset: "85%"
            });
        });
    }
}

export default RevealOnScroll;