'use strict';

/**
 * A parent component to a group of c-checkbox, c-radio r regular checkbox / radio inputs
 * used to check the validity of this group before form submission.
 */
class CInputGroup extends CFormQuestion {
    constructor() {
        super();

        this.checkedInputs = [];
    }


    /**
     * connectedCallback
     */
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('click', this.handleClick.bind(this));
    }


    /**
     * remove listeners on disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick.bind(this));
    }


    /**
     * handle click events
     *
     * @param { Event } e
     */
    handleClick(e){
        this.updateCheckedInputs(e.target);
        this.updateIsValid();
    }


    /**
     * handle keyup events
     *
     * @param { KeyboardEvent } e
     * */
    handleKeyup(e){
        if (e.code === 'Space') {
            this.updateCheckedInputs(e.target);
            this.updateIsValid();
        }
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        // if the form group is required...
        if (this.isRequired){
            // ...at least one selection must have been made, so this.checkedInputs.length will have to be true
            // whether they are checkboxes or radios
            if (this.checkedInputs.length) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid')
            }
        }

        // if the form group is not required, it is valid
        else {
            this.setAttribute('data-valid', '');
        }
    }


    /**
     * @param { HTMLInputElement } input
     */
    updateCheckedInputs(input){
        for (let i = 0; i < this.checkedInputs.length; i++){
            if (this.checkedInputs[i] === input.value){
                this.checkedInputs.splice(i, 1);
            }
        }

        if (input.checked) {
            this.checkedInputs.push(input.value)
        }
    }
}

customElements.define('c-input-group', CInputGroup);
