'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

/**
 * A parent component to a group of checkboxes or radios
 */
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
     * Add and remove the custom 'data-is-valid' attribute
     */
    setValidityState() {
        // if the form group is required...
        if (this.isRequired){
            // ...at least one selection must have been made, so this.checkedInputs.length will have to be true
            // whether they are checkboxes or radios
            if (this.checkedInputs.length) {
                this.setAttribute('data-is-valid', '');
            } else {
                this.removeAttribute('data-is-valid');
                if (this.querySelector('.helper-text')){
                    this.setHelperText('error', 'This field is required');
                }
            }
        }

        // if the form group is not required, it is valid
        else {
            this.setAttribute('data-is-valid', '');
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
