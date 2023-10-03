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

        this.setCounter('.maxlength', this.querySelector('textarea').getAttribute('maxlength'));
        this.setCounter('.counter', this.querySelector('textarea').getAttribute('maxlength'));

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
        this.setCounter('.counter', (this.querySelector('textarea').getAttribute('maxlength') - this.querySelector('textarea').value.length).toString());
        this.updateState();
    }


    /**
     * Set the target element's count
     *
     * @param { string } targetElement
     * @param { string } count - a number
     */
    setCounter(targetElement, count) {
        this.querySelector(targetElement).innerText = count;
    }


    /**
     * Add and remove the custom 'data-is-valid' attribute
     */
    setValidityState() {
        if (this.isRequired){
            if (this.querySelector('textarea').value) {
                this.setAttribute('data-is-valid', '');
            } else {
                this.removeAttribute('data-is-valid');
                super.setHelperText('error', 'This field is required');
            }
        } else {
            this.setAttribute('data-is-valid', '');
        }
    }
}

window.customElements.define('c-textarea', CTextarea );
