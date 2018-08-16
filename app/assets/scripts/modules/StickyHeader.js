import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';   // Imports Waypoint class
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        // Select DOM elements and attach them as properties to this StickyHeader instance
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav a");

        // Create the Waypoint for the Header when the page loads
        this.createHeaderWaypoint();

        // Create Waypoints for each page section when the page loads
        this.createPageSectionWaypoints();

        // Add smooth scrolling to links in the header
        this.addSmoothScrolling();
    }

    /**
     * Adds smooth scrolling to links in the header. If the user clicks one of the header links, the browser will
     * smoothly scrolling to whatever the href for the link is.
     *
     * (The default browser behaviour is to instantly navigate to the link on the same page. This is replaced with
     * smooth scrolling.)
     * https://www.npmjs.com/package/jquery-smooth-scroll
     */
    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }

    /**
     * Creates a Waypoint for a position on the page (the large-hero__title element). When that position is scrolled to
     * by the user, the header background is made darker and the header logo is minimised.
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

    /**
     * Creates Waypoints for each page-section element. When the user scrolls to one of these Waypoints, the
     * text for the corresponding link in the nav bar turns orange.
     *
     * (This is achieved by making use of custom data attributes. Each header link gets its own id property. Then each
     * page-section gets a custom data attribute called data-matching-link. Then when a Waypoint is reached, we just
     * extract the data-matching-link's value. This value will be the ID for the corresponding header link. We use this
     * ID to give it a class that turns it orange.)
     *
     * https://www.w3schools.com/tags/att_global_data.asp
     *
     * A Waypoint defines:
     * 1) element - The DOM element we want to watch for as we scroll down the page.
     * 2) handler - The function we want to fire when the DOM element we are watching is scrolled to.
     * 3) offset - An optional value. By default, waypoints only triggers the handler when the user has scrolled so
     *              that the element has reached the top of the viewport (0%). We can offset it so that the handler
     *              sooner. For example, if we want the handler to fire when the element is near the bottom of the
     *              viewport we could set the offset to 100%.
     *
     * http://imakewebthings.com/waypoints/guides/getting-started/
     */
    createPageSectionWaypoints() {
        // Because the value of 'this' will change when we're using the new keyword for the Waypoint below, we declare
        // 'that' to refer to an instance of the StickyHeader class. This will allow us to access the propertoes on the
        // StickyHeader instance when we're creating a new Waypoint.
        const that = this;

        // each() is a JQuery method: http://api.jquery.com/jquery.each/
        this.pageSections.each(function () {
            // jQuery's each function sets the value of the 'this' keyword to be the current element in the selection
            // that is being looped through.
            const currentPageSection = this;

            // Waypoint for scrolling down to this page-section
            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction === "down") {
                        // Use the getAttribute method to get the custom data attribute. This attribute holds a
                        // reference to the ID of a corresponding button (actually a link inside an li) in the header's
                        // nav bar.
                        const matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        // Remove the orange highlight on every link in the sticky header
                        that.headerLinks.removeClass("is-current-link");
                        // Add the orange highlight to the correct link in the header, i.e. the link that matches the
                        // Waypoint the user just scrolled to
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "18%"           // Trigger the handler when the element is 18% from the top of the viewport
            });

            // Waypoint for scrolling up to this page-section
            new Waypoint({
                element: currentPageSection,
                handler: function (direction) {
                    if (direction === "up") {
                        // Use the getAttribute method to get the custom data attribute. This attribute holds a
                        // reference to the ID of a corresponding button (actually a link inside an li) in the header's
                        // nav bar.
                        const matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        // Remove the orange highlight on every link in the sticky header
                        that.headerLinks.removeClass("is-current-link");
                        // Add the orange highlight to the correct link in the header, i.e. the link that matches the
                        // Waypoint the user just scrolled to
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                offset: "-40%"              // Trigger the handler when the start of the element is 40% from the top of
                                            // the viewport. Negative number required for offsetting when scrolling up.
            });
        });
    }
}

export default StickyHeader;