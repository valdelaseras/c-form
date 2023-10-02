'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

class CTextarea extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        this.updateCounter('.maxlength', this.querySelector('textarea').getAttribute('maxlength'));
        this.updateCounter('.counter', this.querySelector('textarea').getAttribute('maxlength'));

        this.addEventListener('input', this.handleInput.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('input', this.handleInput.bind(this));
    }


    /**
     * Handle input event
     */
    handleInput() {
        this.updateCounter('.counter', (this.querySelector('textarea').getAttribute('maxlength') - this.querySelector('textarea').value.length).toString());
        this.updateState();
    }


    /**
     * Update the target element's count
     *
     * @param { string } targetElement
     * @param { string } count - a number
     */
    updateCounter(targetElement, count) {
        this.querySelector(targetElement).innerText = count;
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        if (this.isRequired){
            if (this.querySelector('textarea').value) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid');
                super.updateHelperText('error', 'This field is required');
            }
        } else {
            this.setAttribute('data-valid', '');
        }
    }
}

window.customElements.define('c-textarea', CTextarea );
