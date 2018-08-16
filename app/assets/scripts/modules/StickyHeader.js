import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';   // Imports Waypoint class

class StickyHeader {
    constructor() {
        // Select DOM elements and attach them as properties to this StickyHeader instance
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");

        // Create the Waypoint for the Header when the page loads
        this.createHeaderWaypoint();
    }

    /**
     * Creates a Waypoint for every element we've selected to be revealed when they are scrolled to.
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
    createHeaderWaypoint() {
        // Because the value of 'this' will change when we're using the new keyword for the Waypoint below, we declare
        // 'that' to refer to an instance of the StickyHeader class. This will allow us to access the propertoes on the
        // StickyHeader instance when we're creating a new Waypoint.
        const that = this;

        new Waypoint({
            // Without the [0], this would refer to the JQuery selection - waypoints wants the native DOM element.
            element: this.headerTriggerElement[0],
            handler: function (direction) {
                // If scrolling down over the Waypoint, add the class that makes the sticky header dark. If scrolling
                // up, remove it.
                if (direction === "down") {
                    that.siteHeader.addClass("site-header--dark");
                } else {
                    that.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }
}

export default StickyHeader;