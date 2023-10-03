'use strict';

class CForm extends HTMLElement {
    constructor() {
        super();

        this.formQuestions = [];
    }


    /**
     * Connected callback
     */
    connectedCallback(){
        this.formQuestions = this.querySelectorAll('.form-question');

        this.setValidityState();

        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('keyup', this.handleKeyup.bind(this));

        this.formQuestions.forEach((formQuestion) => {
            formQuestion.addEventListener('onValidityChange', this.setValidityState.bind(this));
        })
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
        // todo: rename to form-submit-button > need update in pedestal ( version + 1 )
        if (e.target === this.querySelector('.form-submit-button')) {
            this.getFormValues();
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
                    this.getFormValues();
                }
            }
        }
    }


    /**
     * Get form values
     */
    getFormValues() {
        console.log(this.formQuestions);

        this.formQuestions.forEach((question) => {
            console.log(question)
        })
    }


    // @todo: temp, properly validate
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


