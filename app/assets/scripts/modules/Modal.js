import $ from 'jquery';

class Modal {
    constructor() {
        // Select DOM elements and attach them as properties to the Modal instance
        this.openModalButton = $(".open-modal");
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");

        // Start adding listeners to all the events
        this.events();
    }

    /* A single function which attaches event handlers to different events. */
    events() {
        // When a button for opening the modal overlay is clicked...
        this.openModalButton.click(this.openModal.bind(this));

        // When the button for closing the modal overlay is clicked...
        this.closeModalButton.click(this.closeModal.bind(this));

        // When any key is pressed and released...
        $(document).keyup(this.keyPressHandler.bind(this));
    }

    /* An event handler for making the modal overlay visible. */
    openModal() {
        this.modal.addClass("modal--is-visible");
        // By default, when buttons whose href=# are clicked, the browser will immediately hop to the top of the page.
        // This prevents that default behaviour.
        return false;
    }

    /* An event handler for hiding the modal overlay. */
    closeModal() {
        this.modal.removeClass("modal--is-visible");
        // No need for return false, since the close button isn't an actual button - it's just an X inside a div
    }

    /* An event handler for key presses that hides the modal overlay if the escape key was pressed. */
    keyPressHandler(e) {
        // If the key pressed was ESC,
        if (e.keyCode === 27) {
            this.closeModal();
        }
    }
}

export default Modal;