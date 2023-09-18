class CFormGroup extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['data-valid'];
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
}
