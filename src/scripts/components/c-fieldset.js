'use strict';

/**
 * https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element
 */
class CFieldset extends HTMLElement {
    constructor() {
        super();

        this.formQuestions = [];
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        if (this.hasAttribute('data-is-required')) {
            this.querySelector('legend').innerText += '*';
        }
    }
}

customElements.define('c-fieldset', CFieldset);
