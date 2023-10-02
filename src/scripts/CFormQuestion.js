'use strict';

export class CFormQuestion extends HTMLElement {
    constructor() {
        super();

        this.isRequired = false;
    }

    static get observedAttributes() {
        return ['data-valid', 'data-pristine'];
    }


    /**
     * Connected callback
     */
    connectedCallback(){
        this.isRequired = !!this.querySelector('*[required]') || this.hasAttribute('data-required');

        if (!this.getAttribute('data-group')) {
            this.buildHelperElement();

            if (this.isRequired) {
                this.setAsterisk();
            }
        }

        this.setAttribute('data-pristine', '');
        this.updateIsValid();
    }


    /**
     * Attribute changed callback
     */
    attributeChangedCallback(name) {
        if (!this.getAttribute('data-group')){
            if (this.getIsPristine() || this.getIsValid()) {
                this.updateHelperTextVisibility(false);
            } else {
                this.updateHelperTextVisibility(true);
            }
        }

        if (name === 'data-valid') {
            this.dispatchEvent(new Event('onValidityChange'));
        }
    }


    /**
     * Build the helper-text element and append it
     */
    buildHelperElement(){
        const small = document.createElement('small');
        small.classList.add('helper-text');
        this.appendChild(small);
    }


    /**
     * Set an asterisk at the end of the label
     */
    setAsterisk() {
        this.querySelector('label').innerText += '*';
    }


    /**
     * @param { string } status - pick one of 'success', 'warning', 'error' etc.
     * @param { string } message - the message to display
     */
    updateHelperText(status, message) {
        this.querySelector('small.helper-text').classList.add(`font-color-${status}`);
        this.querySelector('small.helper-text').innerText = message;
    }


    /**
     * Update helper text visibility to hidden or visible
     *
     * @param { boolean } isVisible
     */
    updateHelperTextVisibility(isVisible){
        this.querySelector('small.helper-text').style.visibility = isVisible ? 'visible' : 'hidden';
    }


    /**
     * Create a duplicate of an element
     *
     * IMPORTANT: the target element must have the 'duplicable' class
     */
    createDupe() {
        // clone the original duplicable field
        const clonedNode = this.cloneNode(true);

        // a new small.helper-text will be instantiated, so remove the cloned one
        if (clonedNode.querySelector('small')) {
            clonedNode.querySelector('small').remove();
        }

        clonedNode.classList.remove('duplicable');
        clonedNode.classList.add('dupe');

        return clonedNode;
    }


    /**
     * Update 'data-pristine' attribute
     *
     * It only removes the attribute now, but later on we might want
     * an option to reset a form element to pristine state, hence
     * 'update'
     */
    updateIsPristine(){
        if (this.getIsPristine()){
            this.removeAttribute('data-pristine');
        }
    }


    /**
     * Check if this has 'data-pristine' attribute
     *
     * @return { boolean }
     */
    getIsPristine(){
        return this.hasAttribute('data-pristine');
    }


    /**
     * Check if this has 'data-valid' attribute
     *
     * @return { boolean }
     */
    getIsValid(){
        return this.hasAttribute('data-valid');
    }


    /**
     * Update state
     */
    updateState() {
        this.updateIsPristine();
        this.updateIsValid();
    }
}
