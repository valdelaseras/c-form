'use strict';

class CEmailInput extends HTMLElement {
    constructor() {
        super();

        this.isRequired = undefined;

        this.requiredFieldHelperText = 'This field is required';
        this.invalidFieldHelperText = 'Please use a valid email address';
    }

    static get observedAttributes() {
        return ['data-valid'];
    }


    /**
     * connectedCallback
     */
    connectedCallback() {
        this.isRequired = this.querySelector('input[type="email"]').required;
        this.buildHelperElement();
        this.setHelperText('error', this.requiredFieldHelperText);

        if (this.isRequired) {
            this.setAsterisk();
        }

        this.updateIsValid();

        this.addEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * remove listeners on disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * attribute changed callback
     */
    attributeChangedCallback(name) {
        if (this.hasAttribute(name)) {
            this.querySelector('small.helper-text').style.visibility = 'hidden';
        } else {
            this.querySelector('small.helper-text').style.visibility = 'visible';
        }
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
                this.setHelperText('error', this.invalidFieldHelperText);
            }
        } else {
            this.removeAttribute('data-valid');
            this.setHelperText('error', this.requiredFieldHelperText);
        }
    }



    /**
     * set asterisk at the end of the label if it is a required field
     */
    setAsterisk() {
        this.querySelector('.form-group-label').innerText += '*';
    }


    /**
     * build the form field helper element and append it to the end of this (c-form-group)
     */
    buildHelperElement(){
        const small = document.createElement('small');
        small.classList.add('helper-text');
        this.appendChild(small);
    }

    /**
     * @param { string } status - pick one of 'success', 'warning', 'error' etc.
     * @param { string } message - the message to display
     */
    setHelperText(status, message) {
        this.querySelector('small.helper-text').classList.add(`font-color-${status}`);
        this.querySelector('small.helper-text').innerText = message;
    }
}

customElements.define('c-email-input', CEmailInput);
