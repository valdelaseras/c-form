'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

class CUrlInput extends CFormQuestion {
    constructor() {
        super();

        this.requiredFieldHelperText = 'This field is required';
        this.invalidFieldHelperText = 'Please insert a valid url';
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
        const input = this.querySelector('input[type="url"]');
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

customElements.define('c-url-input', CUrlInput);
