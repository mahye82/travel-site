import $ from 'jquery';

class MobileMenu {
    constructor() {
        // Select different DOM elements and store them as properties to an instance of MobileMenu
        this.siteHeader = $('.site-header');
        this.menuIcon = $('.site-header__menu-icon');
        this.menuContent = $('.site-header__menu-content');
        this.events();
    }

    /* A single function which attaches event handlers to different events. */
    events() {
        // Need to bind the value of 'this' to be the MobileMenu instance, otherwise 'this' will refer to this.menuIcon
        // in toggleMenu
        this.menuIcon.click(this.toggleMenu.bind(this));
    }

    /* An event handler that toggles the appearance of the navigation menu icon on smaller screens. */
    toggleMenu() {
        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        this.siteHeader.toggleClass("site-header--is-expanded");
        this.menuIcon.toggleClass("site-header__menu-icon--close-x");
    }
}

export default MobileMenu;