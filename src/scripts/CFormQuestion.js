export class CFormQuestion extends HTMLElement {
    constructor() {
        super();

        this.isRequired = false;
    }

    static get observedAttributes() {
        return ['data-valid'];
    }


    connectedCallback(){
        this.isRequired = !!this.querySelector('*[required]') || this.hasAttribute('data-required');

        if (!this.getAttribute('data-group')) {
            this.buildHelperElement();

            if (this.isRequired) {
                this.setHelperText('error', 'This field is required');
                this.setAsterisk();
            }
        }

        this.updateIsValid();

        this.addEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * Remove any listeners on disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * attribute changed callback
     */
    attributeChangedCallback(name) {
        if (!this.getAttribute('data-group')){
            if (this.hasAttribute(name)) {
                this.querySelector('small.helper-text').style.visibility = 'hidden';
            } else {
                this.querySelector('small.helper-text').style.visibility = 'visible';
            }
        }

        this.dispatchEvent(new Event('onValidityChange'));
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
     * set asterisk at the end of the label if it is a required field
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
}
