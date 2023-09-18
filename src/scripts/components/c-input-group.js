'use strict';

/**
 * A parent component to a group of c-checkbox, c-radio r regular checkbox / radio inputs
 * used to check the validity of this group before form submission.
 *
 * @todo: slightly different as its a group of c-whatever elements
 */
class CInputGroup extends HTMLElement {
    constructor() {
        super();

        this.isRequired = undefined;
        this.checkedInputs = [];
    }


    static get observedAttributes() {
        return ['data-valid'];
    }


    /**
     * connectedCallback
     */
    connectedCallback() {
        this.isRequired = this.hasAttribute('data-required');
        this.buildHelperElement();
        this.setHelperText('error', 'This field is required');

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
            this.querySelector('small.group-helper-text').style.visibility = 'hidden';
        } else {
            this.querySelector('small.group-helper-text').style.visibility = 'visible';
        }
    }


    /**
     * handle click events
     *
     * @param { Event } e
     */
    handleClick(e){
        this.updateCheckedInputs(e.target);
        this.updateIsValid();
    }


    /**
     * handle keyup events
     *
     * @param { KeyboardEvent } e
     * */
    handleKeyup(e){
        if (e.code === 'Space') {
            // on Space, e.target is the HTMLLabelElement, so we must first select the accompanying input element
            const input = this.querySelector(`input[id=${e.target.getAttribute('for')}]`);

            this.updateCheckedInputs(input);
            this.updateIsValid();
        }
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        // if the form group is required...
        if (this.isRequired){
            // ...at least one selection must have been made, so this.checkedInputs.length will have to be true
            if (this.checkedInputs.length) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid')
            }
        }

        // if the form group is not required, it is valid
        else {
            this.setAttribute('data-valid', '');
        }
    }


    /**
     * @param { HTMLInputElement } input
     */
    updateCheckedInputs(input){
        if (input.checked) {
            this.checkedInputs.push(input.value)
        } else {
            for (let i = 0; i < this.checkedInputs.length; i++){
                if (this.checkedInputs[i] === input.value){
                    this.checkedInputs.splice(i, 1);
                }
            }
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
        small.classList.add('group-helper-text');
        this.appendChild(small);
    }


    /**
     * @param { string } status - pick one of 'success', 'warning', 'error' etc.
     * @param { string } message - the message to display
     */
    setHelperText(status, message) {
        this.querySelector('small.group-helper-text').classList.add(`font-color-${status}`);
        this.querySelector('small.group-helper-text').innerText = message;
    }
}

customElements.define('c-input-group', CInputGroup);
