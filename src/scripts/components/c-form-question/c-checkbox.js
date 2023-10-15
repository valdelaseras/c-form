'use strict';

import {CFormQuestion} from "../../CFormQuestion.js";

class CCheckbox extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('keyup', this.handleKeyup.bind(this));
        this.addEventListener('click', this.handleClick.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
        this.removeEventListener('click', this.handleClick.bind(this));
    }


    /**
     * Get value
     *
     * @returns { string }
     */
    getValue(){
        return this.querySelector('input').value;
    }


    /**
     * Add and remove the custom 'data-is-valid' attribute, update helper texts accordingly
     */
    setValidityState() {
        if (!this.hasAttribute('data-group')){
            if (this.isRequired){
                if (this.querySelector('input').checked) {
                    this.setIsValid(true);
                } else {
                    this.setIsValid(false);
                    this.setHelperText('error', 'This field is required');
                }
            } else {
                this.setIsValid(true);
            }
        }
    }


    /**
     * Handle click events
     */
    handleClick() {
        this.updateState();
    }


    /**
     * Handle keyup event
     *
     * @param { KeyboardEvent } e
     */
    handleKeyup(e) {
        if (document.activeElement === this.querySelector('label')) {
            if (e.code === 'Space') {
                this.querySelector('input[type="checkbox"]').checked = !this.querySelector('input[type="checkbox"]').checked;
                this.updateState();
            }
        }
    }
}

customElements.define('c-checkbox', CCheckbox);
