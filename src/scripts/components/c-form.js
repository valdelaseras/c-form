'use strict';

/**
 * @todo: update this.formQuestions ( re duplicates etc )
 */
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
        let formData = {};

        this.formQuestions.forEach(formQuestion => formData[formQuestion.getKey()] = formQuestion.getValue());

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
     * Update overall form validity
     * @todo: temp, properly validate
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


