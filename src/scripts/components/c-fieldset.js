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

        this.hideFormQuestionLabels();
    }


    /**
     * The legend is the label for the collective fields in this fieldset,
     * but for semantic reasons we add the labels of the individual fields
     * in the template, then don't display them.
     */
    hideFormQuestionLabels() {
        this.querySelectorAll('label').forEach((label) => {
            label.style.display = 'none';
        })
    }
}

customElements.define('c-fieldset', CFieldset);
