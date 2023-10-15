'use strict';

import {CFormQuestion} from "../../CFormQuestion.js";

class CTextarea extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.querySelector('.char-counter')) {
            this.setCounter('.maxlength', this.querySelector('textarea').getAttribute('maxlength'));
            this.setCounter('.counter', this.querySelector('textarea').getAttribute('maxlength'));
        }

        this.addEventListener('input', this.handleInput.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('input', this.handleInput.bind(this));
    }


    /**
     * Get value
     *
     * @returns { string }
     */
    getValue(){
        return this.querySelector('textarea').value;
    }


    /**
     * Set the target element's count
     *
     * @param { string } targetElement
     * @param { string } count ( a number )
     */
    setCounter(targetElement, count) {
        this.querySelector(targetElement).innerText = count;
    }


    /**
     * Add and remove the custom 'data-is-valid' attribute, update helper texts accordingly
     */
    setValidityState() {
        if (this.isRequired){
            if (this.querySelector('textarea').value) {
                this.setIsValid(true);
            } else {
                this.setIsValid(false);
                this.setHelperText('error', 'This field is required');
            }
        } else {
            this.setIsValid(true);
        }
    }


    /**
     * Handle input event
     */
    handleInput() {
        if (this.querySelector('.char-counter')) {
            this.setCounter('.counter', (this.querySelector('textarea').getAttribute('maxlength') - this.querySelector('textarea').value.length).toString());
        }

        this.updateState();
    }
}

window.customElements.define('c-textarea', CTextarea );
