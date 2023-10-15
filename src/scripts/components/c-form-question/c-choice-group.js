'use strict';

import {CFormQuestion} from "../../CFormQuestion.js";

class CChoiceGroup extends CFormQuestion {
    constructor() {
        super();

        this.checkedInputs = [];
    }


    /**
     * Connected callback
     */
    connectedCallback() {
        this.updateCheckedInputs();

        super.connectedCallback();

        this.addEventListener('keyup', this.handleKeyup.bind(this));
        this.addEventListener('click', this.handleClick.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
        this.removeEventListener('click', this.handleClick.bind(this));
    }



    /**
     * Get value
     *
     * @returns { string[] }
     */
    getValue(){
        const checkedInputs = [];

        this.querySelectorAll('input').forEach((input) => {
            if (input.checked) {
                checkedInputs.push(input.value);
            }
        });

        return checkedInputs;
    }


    /**
     * Add and remove the custom 'data-is-valid' attribute, update helper texts accordingly
     */
    setValidityState() {
        // if the form group is required...
        if (this.isRequired){
            // ...at least one selection must have been made, so this.checkedInputs.length will have to be true
            // whether they are checkboxes or radios
            if (this.checkedInputs.length) {
                this.setIsValid(true);
            } else {
                this.setIsValid(false);
                this.setHelperText('error', 'This field is required');
            }
        }

        // if the form group is not required, it is valid
        else {
            this.setIsValid(true);
        }
    }


    /**
     * Handle click events
     */
    handleClick(){
        this.updateCheckedInputs();
        this.updateState();
    }


    /**
     * Handle keyup events
     *
     * @param { KeyboardEvent } e
     * */
    handleKeyup(e){
        if (e.code === 'Space') {
            this.updateCheckedInputs();
            this.updateState();
        }
    }


    /**
     * Add any input to this.checkedInputs if it's checked, or remove it if isn't ( anymore )
     */
    updateCheckedInputs(){
        this.querySelectorAll('input').forEach((input) => {
            for (let i = 0; i < this.checkedInputs.length; i++){
                if (this.checkedInputs[i] === input.value){
                    this.checkedInputs.splice(i, 1);
                }
            }

            if (input.checked) {
                this.checkedInputs.push(input.value);
            }
        })
    }
}

customElements.define('c-choice-group', CChoiceGroup);
