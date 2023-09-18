'use strict';

class CCheckbox extends CFormGroup {
    constructor() {
        super();
    }


    /**
     * connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('click', this.handleClick.bind(this));
    }


    /**
     * remove listeners on disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick.bind(this));
    }


    /**
     * handle click
     */
    handleClick() {
        this.updateIsValid();
    }


    /**
     * handle key up
     *
     * @param { KeyboardEvent } e
     */
    handleKeyup(e) {
        if ( document.activeElement === this.querySelector('label' )) {
            if ( e.code === 'Space' ) {
                this.querySelector('input[type="checkbox"]').checked = !this.querySelector('input[type="checkbox"]').checked;
            }
        }
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        if (this.isRequired){
            if (this.querySelector('input').checked) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid')
            }
        } else {
            this.setAttribute('data-valid', '');
        }
    }
}

customElements.define('c-checkbox', CCheckbox);
