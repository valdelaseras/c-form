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

        this.updateIsValid();

        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('keyup', this.handleKeyup.bind(this));

        this.formQuestions.forEach((formQuestion) => {
            formQuestion.addEventListener('onValidityChange', this.updateIsValid.bind(this));
        })
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback(){
        this.removeEventListener('click', this.handleClick.bind(this));
        this.removeEventListener('keyup', this.handleKeyup.bind(this));

        this.formQuestions.forEach((formQuestion) => {
            formQuestion.removeEventListener('onValidityChange', this.updateIsValid.bind(this));
        })
    }


    /**
     * Handle click events
     */
    handleClick(e){
        if (e.target === this.querySelector('.form-submit-btn')) {
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
            if (e.target === this.querySelector('.form-submit-btn')) {
                if (!this.querySelector('.form-submit-btn.button-disabled')) {
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
    updateIsValid() {
        this.toggleSubmitBtn(this.formQuestions.length === this.querySelectorAll('.form-question[data-valid]').length);
    }


    /**
     * Toggle submit button state
     *
     * @param { boolean } isValid
     */
    toggleSubmitBtn(isValid) {
        if (isValid) {
            this.querySelector('.form-submit-btn').classList.remove('btn-disabled');
            this.querySelector('.form-submit-btn').setAttribute('tabindex', '0');
        } else {
            this.querySelector('.form-submit-btn').classList.add('btn-disabled');
            this.querySelector('.form-submit-btn').setAttribute('tabindex', '-1');
        }
    }
}

customElements.define('c-form', CForm);


