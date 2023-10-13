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
     * @returns { string }
     */
    getKey () {
        return this.getAttribute('data-key');
    }


    /**
     * Connected callback
     */
    connectedCallback(){
        this.isRequired = !!this.querySelector('*[required]') || this.hasAttribute('data-is-required');

        if (this.isRequired) {
            this.setAsterisk();
        }

        this.setAttribute('data-is-pristine', '');
        this.setValidityState();
    }


    /**
     * Attribute changed callback
     */
    attributeChangedCallback(name) {
        if (!this.hasAttribute('data-group')){
            if (this.querySelector('.helper-text')) {
                if (this.getIsPristine() || this.getIsValid()) {
                    this.setHelperTextVisibility(false);
                } else {
                    this.setHelperTextVisibility(true);
                }
            }
        }

        if (name === 'data-is-valid') {
            this.dispatchEvent(new Event('onValidityChange'));
        }
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
        this.querySelector('.helper-text').classList.add(`font-color-${status}`);
        this.querySelector('.helper-text').innerText = message;
    }


    /**
     * Set helper text visibility to hidden or visible
     *
     * @param { boolean } isVisible
     */
    setHelperTextVisibility(isVisible){
        this.querySelector('.helper-text').style.visibility = isVisible ? 'visible' : 'hidden';
    }


    /**
     * Create a duplicate of the target '.duplicable-element'
     *
     * @returns { HTMLElement } clonedNode
     */
    createDupe() {
        const clonedNode = this.cloneNode(true);

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
     * @returns { boolean }
     */
    getIsPristine(){
        return this.hasAttribute('data-is-pristine');
    }


    /**
     * Check if this has 'data-is-valid' attribute
     *
     * @returns { boolean }
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
