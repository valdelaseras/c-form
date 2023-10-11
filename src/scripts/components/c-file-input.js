'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

export class CFileInput extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('keyup', this.handleKeyup.bind(this));
        this.addEventListener('change', this.handleChange.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
        this.removeEventListener('change', this.handleChange.bind(this));
    }


    /**
     * Set asterisk for required c-file-input
     */
    setAsterisk() {
        this.querySelector('.file-input-title').innerText += '*';
    }


    /**
     * Handle keyup
     *
     * @param { KeyboardEvent } e
     */
    handleKeyup(e) {
        if (document.activeElement === this.querySelector('label')) {
            if (e.code === 'Enter') {
                this.querySelector('label').click();
            }
        }
    }


    /**
     * Handle change
     */
    handleChange(){
        this.updateState();

        if (this.querySelector('input[type="file"]').files.length){
            this.displayStep('.file-selected-step');
            this.setText('.file-selected-step .file-input-subtitle', this.querySelector('input[type="file"]').files[0].name);
        } else {
            this.displayStep('.file-selection-step');
        }
    }


    /**
     * Display step
     *
     * @param { string } step the selector of the target step to display
     */
    displayStep(step){
        this.querySelectorAll('.c-file-input-step').forEach((step) => {
            step.classList.add('hidden');
        })

        this.querySelector(step).classList.remove('hidden');
    }


    /**
     * @param { string } selector
     * @param { string } text
     */
    setText(selector, text) {
        this.querySelector(selector).innerText = text;
    }


    /**
     * Set validity state
     */
    setValidityState(){
        if (this.isRequired) {
            if (this.querySelector('input[type="file"]').value) {
                if (this.hasAttribute('data-max-size')) {
                    this.setMaxSizeValidity();
                } else {
                    this.setAttribute('data-is-valid', '');
                }
            } else {
                this.removeAttribute('data-is-valid');
                super.setHelperText('error', 'This field is required');
            }
        } else {
            if (this.querySelector('input[type="file"]').value) {
                if (this.hasAttribute('data-max-size')) {
                    this.setMaxSizeValidity();
                }
            }
        }
    }


    /**
     * Set max size validity
     */
    setMaxSizeValidity() {
        if (this.querySelector('input[type="file"]').files[0].size > this.getAttribute('data-max-size')) {
            this.removeAttribute('data-is-valid');
            super.setHelperText('error', `This file is too large, the maximum size is ${this.getAttribute('data-max-size')/1048576} MB`);
        } else {
            this.setAttribute('data-is-valid', '');
        }
    }
}

customElements.define('c-file-input', CFileInput);
