'use strict';

class CEmailInput extends CFormQuestion {
    constructor() {
        super();

        this.requiredFieldHelperText = 'This field is required';
        this.invalidFieldHelperText = 'Please use a valid email address';
    }


    /**
     * connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();
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
        if (this.querySelector('input[type="email"]').value) {
            if (this.querySelector('input[type="email"]').validity.valid ) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid');
                super.setHelperText('error', this.invalidFieldHelperText);
            }
        } else {
            this.removeAttribute('data-valid');
            super.setHelperText('error', this.requiredFieldHelperText);
        }
    }
}

customElements.define('c-email-input', CEmailInput);
