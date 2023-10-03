'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

/**
 * Intended for input types[email, url, text, tel]
 * For input type[checkbox, radio], please use c-checkbox / c-radio
 */
export class CInput extends CFormQuestion {
    constructor() {
        super();


        this.requiredFieldHelperText = 'This field is required';
        this.invalidFieldHelperText = '';
    }


    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('input', this.handleInput.bind(this));

        this.setInvalidFieldHelperText(this.querySelector('input').getAttribute('type'));
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
        this.updateState();
    }


    /**
     * Add and remove the custom 'data-is-valid' attribute, update helper texts
     */
    setValidityState() {
        const isValid = this.querySelector('input').validity.valid;
        const hasValue = this.querySelector('input').value;

        if (this.isRequired) {
            if (!hasValue) {
                this.removeAttribute('data-is-valid');
                super.setHelperText('error', this.requiredFieldHelperText);
            } else if (!isValid) {
                this.removeAttribute('data-is-valid');
                super.setHelperText('error', this.invalidFieldHelperText);
            } else {
                this.setAttribute('data-is-valid', '');
            }
        } else if (hasValue && !isValid) {
            this.removeAttribute('data-is-valid');
            super.setHelperText('error', this.invalidFieldHelperText);
        } else {
            this.setAttribute('data-is-valid', '');
        }
    }


    /**
     * Set the correct value for invalid field helper texts
     *
     * @param { string } type - the input[type]
     */
    setInvalidFieldHelperText(type){
        switch(type) {
            case 'email':
                this.invalidFieldHelperText = 'Please use a valid email address';
                break;
            case 'url':
                this.invalidFieldHelperText = 'Please insert a valid url';
                break;
            // some types don't required additional helper texts, and we default to an empty string
            default:
                this.invalidFieldHelperText = '';
        }
    }


    /**
     * Set a "unique" id for input and label ( @todo: perhaps later look into generating actual UIDs )
     * Clear any potential input value
     *
     * @return { CInput }
     */
    createDupe() {
        const clonedNode = super.createDupe();

        const dupeId = clonedNode.querySelector('input').id = Math.floor(Math.random() * 1000000).toString(10);

        clonedNode.querySelector('input').id = dupeId;
        clonedNode.querySelector('label').setAttribute('for', dupeId);

        // clear any values of the original field
        clonedNode.querySelector('input').value = '';

        return clonedNode;
    }
}

customElements.define('c-input', CInput);
