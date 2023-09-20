import {CFormQuestion} from "../CFormQuestion.js";

/**
 * Intended for input types: email, url, text, tel
 * For input types checkbox and radio, please use c-checkbox / c-radio
 */
class CInput extends CFormQuestion {
    constructor() {
        super();

        this.requiredFieldHelperText = 'This field is required';
        this.invalidFieldHelperText = '';
    }

    connectedCallback() {
        super.connectedCallback();

        this.setInvalidFieldHelperText(this.querySelector('input').getAttribute('type'));
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
        const isValid = this.querySelector('input').validity.valid;
        const hasValue = this.querySelector('input').value;

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


    setInvalidFieldHelperText(type){
        switch(type) {
            case 'email':
                this.invalidFieldHelperText = 'Please use a valid email address';
                break;
            case 'url':
                this.invalidFieldHelperText = 'Please insert a valid url';
                break;
            // if types are 'text', default to an empty string
            default:
                this.invalidFieldHelperText = '';
        }
    }
}

customElements.define('c-input', CInput);
