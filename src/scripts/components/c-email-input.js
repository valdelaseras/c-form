'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

class CEmailInput extends CFormQuestion {
    constructor() {
        super();

        this.requiredFieldHelperText = 'This field is required';
        this.invalidFieldHelperText = 'Please use a valid email address';
    }


    /**
     * handle key up events
     * */
    handleKeyup(){
        this.updateIsValid();
    }


    /**
     * add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        const input = this.querySelector('input[type="email"]');
        const isValid = input.validity.valid;
        const hasValue = input.value;

        if (this.isRequired) {
            if (!hasValue) {
                this.removeAttribute('data-valid');
                super.setHelperText('error', this.requiredFieldHelperText);
            } else if (!isValid) {
                this.removeAttribute('data-valid');
                super.setHelperText('error', this.invalidFieldHelperText);
            } else {
                this.setAttribute('data-valid', '');
            }
        } else if (hasValue && !isValid) {
            this.removeAttribute('data-valid');
            super.setHelperText('error', this.invalidFieldHelperText);
        } else {
            this.setAttribute('data-valid', '');
        }
    }
}

customElements.define('c-email-input', CEmailInput);
