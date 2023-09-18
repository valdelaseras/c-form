'use strict';

class CTextarea extends CFormGroup {
    constructor() {
        super();

        this.isRequired = undefined;
    }


    /**
     * Connected callback
     */
    connectedCallback() {
        this.isRequired = this.querySelector('textarea').required;
        this.buildHelperElement();
        this.setHelperText('error', 'This textarea is required');

        if (this.isRequired) {
            this.setAsterisk();
        }

        this.updateIsValid();

        this.setCounter('.maxlength', this.querySelector( 'textarea' ).getAttribute('maxlength' ));
        this.setCounter('.counter', this.querySelector( 'textarea' ).getAttribute('maxlength' ));

        this.querySelector('textarea').addEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * Remove any listeners on disconnected callback
     */
    disconnectedCallback() {
        this.querySelector('textarea').removeEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * Handle keyup event
     */
    handleKeyup(){
        this.setCounter( '.counter', (this.querySelector( 'textarea' ).getAttribute('maxlength' ) - this.querySelector( 'textarea' ).value.length ).toString() );
        this.updateIsValid();
    }


    /**
     * Set a counter value in a target element
     *
     * @param { string } targetSelector
     * @param { string } count - the (string) number to set in the target element
     */
    setCounter( targetSelector, count ) {
        this.querySelector( targetSelector ).innerText = count;
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        if (this.isRequired){
            if (this.querySelector('textarea').value) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid')
            }
        } else {
            this.setAttribute('data-valid', '');
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

window.customElements.define('c-textarea', CTextarea );
