'use strict';

export class CFormQuestion extends HTMLElement {
    constructor() {
        super();

        this.isRequired = false;
    }

    static get observedAttributes() {
        return ['data-is-valid', 'data-is-pristine'];
    }


    /**
     * Connected callback
     */
    connectedCallback(){
        this.isRequired = !!this.querySelector('*[required]') || this.hasAttribute('data-is-required');

        if (!this.hasAttribute('data-group')) {
            this.append(this.buildHelperElement());

            if (this.isRequired) {
                this.setAsterisk();
            }
        }

        this.setAttribute('data-is-pristine', '');
        this.setValidityState();
    }


    /**
     * Attribute changed callback
     */
    attributeChangedCallback(name) {
        if (!this.hasAttribute('data-group')){
            if (this.getIsPristine() || this.getIsValid()) {
                this.setHelperTextVisibility(false);
            } else {
                this.setHelperTextVisibility(true);
            }
        }

        if (name === 'data-is-valid') {
            this.dispatchEvent(new Event('onValidityChange'));
        }
    }


    /**
     * Build and return the helper-text element
     *
     * @return { HTMLElement } small
     */
    buildHelperElement(){
        const small = document.createElement('small');
        small.classList.add('helper-text');

        return small;
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
    setHelperText(status, message) {
        this.querySelector('small.helper-text').classList.add(`font-color-${status}`);
        this.querySelector('small.helper-text').innerText = message;
    }


    /**
     * Set helper text visibility to hidden or visible
     *
     * @param { boolean } isVisible
     */
    setHelperTextVisibility(isVisible){
        this.querySelector('small.helper-text').style.visibility = isVisible ? 'visible' : 'hidden';
    }


    /**
     * Create a duplicate of the target '.duplicable-element'
     *
     * @return { HTMLElement } clonedNode
     */
    createDupe() {
        // clone the original 'duplicable-element' field
        const clonedNode = this.cloneNode(true);

        // a new small.helper-text will be instantiated, so remove the cloned one
        if (clonedNode.querySelector('small')) {
            clonedNode.querySelector('small').remove();
        }

        clonedNode.classList.remove('duplicable-element');
        clonedNode.classList.add('dupe');

        return clonedNode;
    }


    /**
     * Set 'data-is-pristine'
     *
     * It only removes the attribute now, but later on we might want
     * an option to reset a form element to pristine state, hence
     * 'update'
     */
    setPristineState(){
        if (this.getIsPristine()){
            this.removeAttribute('data-is-pristine');
        }
    }


    /**
     * Check if this has 'data-is-pristine' attribute
     *
     * @return { boolean }
     */
    getIsPristine(){
        return this.hasAttribute('data-is-pristine');
    }


    /**
     * Check if this has 'data-is-valid' attribute
     *
     * @return { boolean }
     */
    getIsValid(){
        return this.hasAttribute('data-is-valid');
    }


    /**
     * Update state
     * @todo: need a better name for this
     */
    updateState() {
        this.setPristineState();
        this.setValidityState();
    }
}
