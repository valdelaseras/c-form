'use strict';

class CForm extends HTMLElement {
    constructor() {
        super();

        this.formQuestions = [];
    }

    /**
     * Get form data
     *
     * @returns { FormData }
     */
    getFormData() {
        const formData = Array.from(this.formQuestions).reduce((accumulator, formQuestion) => {

            const value = formQuestion.getValue();
            const key = formQuestion.getKey();

            // Check if key already exists
            if (accumulator[key]) {
                // Check if the value is an array
                if (Array.isArray(accumulator[key])) {
                    // Append the new value to the array
                    accumulator[key].push(value);
                } else {
                    // Make it an array if it isn't yet and add the new value
                    accumulator[key] = [
                        accumulator[key],
                        value
                    ];
                }
            } else {
                // Add form question value to the accumulator
                accumulator[key] = value;
            }

            // Return the accumulator to be used in the next iteration of the reducer
            return accumulator;
        }, {}); // {} is the initial value

        console.log(formData);

        return formData;
    }


    /**
     * Get form questions
     *
     * @returns { HTMLCollection }
     */
    getFormQuestions(){
        return this.querySelectorAll('.form-question');
    }


    /**
     * Connected callback
     */
    connectedCallback(){
        this.formQuestions = this.getFormQuestions();

        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('keyup', this.handleKeyup.bind(this));

        this.addEventListener('duplicateCountUpdated', this.handleDuplicateCountUpdated.bind(this));

        this.formQuestions.forEach((formQuestion) => {
            formQuestion.addEventListener('onValidityChange', this.setValidityState.bind(this));
        });

        this.setValidityState();
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback(){
        this.removeEventListener('click', this.handleClick.bind(this));
        this.removeEventListener('keyup', this.handleKeyup.bind(this));

        this.removeEventListener('duplicateCountUpdated', this.handleDuplicateCountUpdated.bind(this));

        this.formQuestions.forEach((formQuestion) => {
            formQuestion.removeEventListener('onValidityChange', this.setValidityState.bind(this));
        })
    }


    /**
     * Handle click events
     */
    handleClick(e){
        if (e.target === this.querySelector('.form-submit-button')) {
            this.getFormData();
        }
    }


    /**
     * Handle key up
     *
     * @param { KeyboardEvent } e
     */
    handleKeyup(e){
        if (e.code === 'Enter'){
            if (e.target === this.querySelector('.form-submit-button')) {
                if (!this.querySelector('.form-submit-button.button-disabled')) {
                    this.getFormData();
                }
            }
        }
    }


    /**
     * Handle duplicate count updated
     */
    handleDuplicateCountUpdated() {
        this.formQuestions = this.getFormQuestions();
    }


    /**
     * Update overall form validity
     */
    setValidityState() {
        this.setSubmitButtonState(this.formQuestions.length === this.querySelectorAll('.form-question[data-is-valid]').length);
    }


    /**
     * Set submit button state
     *
     * @param { boolean } isValid
     */
    setSubmitButtonState(isValid) {
        if (isValid) {
            this.querySelector('.form-submit-button').classList.remove('button-disabled');
            this.querySelector('.form-submit-button').setAttribute('tabindex', '0');
        } else {
            this.querySelector('.form-submit-button').classList.add('button-disabled');
            this.querySelector('.form-submit-button').setAttribute('tabindex', '-1');
        }
    }
}

customElements.define('c-form', CForm);


