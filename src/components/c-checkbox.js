'use strict';

class CCheckbox extends HTMLElement {
    constructor() {
        super();

        this.isRequired = undefined;
    }

    static get observedAttributes() {
        return ['data-valid'];
    }


    /**
     * connectedCallback
     */
    connectedCallback() {
        this.isRequired = this.querySelector('input').required;
        this.buildHelperElement();
        this.setHelperText('danger', 'You must check this box');

        if (this.isRequired) {
            this.setAsterisk();
        }

        this.updateIsValid();

        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * remove listeners on disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick.bind(this));
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
     * handle click
     */
    handleClick() {
        this.updateIsValid();
    }


    /**
     * handle key up
     *
     * @param { KeyboardEvent } e
     */
    handleKeyup(e) {
        if ( document.activeElement === this.querySelector('label' )) {
            if ( e.code === 'Space' ) {
                this.querySelector('input[type="checkbox"]').checked = !this.querySelector('input[type="checkbox"]').checked;
            }
        }
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        if (this.isRequired){
            if (this.querySelector('input').checked) {
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
     * @param { string } status - pick one of 'success', 'warning', 'danger' etc.
     * @param { string } message - the message to display
     */
    setHelperText(status, message) {
        this.querySelector('small.helper-text').classList.add(`font-color-${status}`);
        this.querySelector('small.helper-text').innerText = message;
    }
}

customElements.define('c-checkbox', CCheckbox);
