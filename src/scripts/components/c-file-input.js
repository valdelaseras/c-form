'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

export class CFileInput extends CFormQuestion {
    constructor() {
        super();

        this.fileName = '';
        this.allowedTypes = [];
        this.validType = false;
        this.validSize = false;
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.querySelector('input[type="file"]').hasAttribute('accept')) {
            this.allowedTypes = this.querySelector('input[type="file"]').getAttribute('accept').split(',');
        }

        this.addEventListener('keyup', this.handleKeyup.bind(this));
        this.addEventListener('change', this.handleChange.bind(this));
        this.addEventListener('drop', this.handleDrop.bind(this));
        this.addEventListener('dragover', this.handleDragover.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
        this.removeEventListener('change', this.handleChange.bind(this));
        this.removeEventListener('drop', this.handleDrop.bind(this));
        this.removeEventListener('dragover', this.handleDragover.bind(this));
    }


    /**
     * Handle drop
     *
     * @param { DragEvent } e
     */
    handleDrop(e){
        e.preventDefault();

        this.classList.remove('dragover');

        if (e.dataTransfer.items[0].kind === 'file'){
            this.fileName = e.dataTransfer.items[0].getAsFile().name;

            this.validType = this.querySelector('input[type="file"]').hasAttribute('accept') ? this.isValidType(e.dataTransfer.items[0].type) : true;
            this.validSize = this.hasAttribute('data-max-size') ? this.isValidSize(e.dataTransfer.items[0].getAsFile().size) : true;

            this.displayStep('.file-selected-step');
            this.setFileName(this.fileName);
        } else {
            this.fileName = '';
            this.displayStep('.file-selection-step');
        }

        this.updateState();
    }


    /**
     * Handle dragover
     *
     * @param { DragEvent } e
     */
    handleDragover(e){
        e.preventDefault();

        this.classList.add('dragover');
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
    handleChange() {
        // @todo: if previously dropped an invalid file, the input value and helper text is not reset

        if (this.querySelector('input[type="file"]').files.length) {
            this.fileName = this.querySelector('input[type="file"]').files[0].name;

            this.validType = this.querySelector('input[type="file"]').hasAttribute('accept') ? this.isValidType(this.querySelector('input[type="file"]').files[0].type) : true;
            this.validSize = this.hasAttribute('data-max-size') ? this.isValidSize(this.querySelector('input[type="file"]').files[0].size) : true;

            this.displayStep('.file-selected-step');
            this.setFileName(this.fileName);
        } else {
            this.fileName = '';
            this.displayStep('.file-selection-step');
        }

        this.updateState();
    }


    /**
     * Set asterisks on all .file-input-title for required c-file-input
     */
    setAsterisk() {
        this.querySelectorAll('.file-input-title').forEach((title) => {
            title.innerText += '*';
        })
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
     * @param { string } name
     */
    setFileName(name) {
        this.querySelector('.file-selected-step .file-input-subtitle').innerText = name;
    }


    /**
     * Set validity state
     */
    setValidityState(){
        // the form question is not pristine & there is no selected file
        if (this.isRequired && this.fileName === '') {
            this.setErrorText('This field is required');
        // [data-max-size] was set and the selected file has exceeded that size
        } else if (this.hasAttribute('data-max-size') && this.validSize === false) {
            this.setErrorText(`This file is too large, the maximum size is ${this.getAttribute('data-max-size')/1048576} MB`);
        // [accept] was set and the selected file type is not among the accepted types
        } else if (this.allowedTypes.length && this.validType === false) {
            this.setErrorText(`This file type is not allowed. Please select a file with any of the following types: ${this.allowedTypes}`);
        } else {
            this.setAttribute('data-is-valid', '');
        }
    }

    /**
     * Set error text
     *
     * @param { string } message
     */
    setErrorText(message){
        this.removeAttribute('data-is-valid');
        super.setHelperText('error', message);
    }


    /**
     * Check if the file size is valid
     *
     * @param { number } size
     * @return { boolean }
     * */
    isValidSize(size){
        return this.validSize = size <= parseInt(this.getAttribute('data-max-size'));
    }


    /**
     * Check if the file type is valid
     *
     * @param { string } type
     * @return { boolean }
     */
    isValidType(type) {
        return this.allowedTypes.includes(type);
    }
}

customElements.define('c-file-input', CFileInput);
