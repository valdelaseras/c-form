'use strict';

/**
 *
 * Some instructions on how to use c-form:
 *
 * formQuestions: the .form-question class should be applied to all c-${form component} that
 * represent a single 'question'. So, note that a form question could have several c-${form component}
 * elements nested ( like a group of checkboxes ), which should *not* individually receive the
 * form-question class.
 */
class CForm extends HTMLElement {
    constructor() {
        super();

        this.formQuestions = [];
    }

    connectedCallback(){
        this.formQuestions = this.querySelectorAll('.form-question');

        this.updateIsValid();

        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('keyup', this.handleKeyup.bind(this));

        this.formQuestions.forEach((formQuestion) => {
            formQuestion.addEventListener('onValidityChange', this.updateIsValid.bind(this));
        })
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.handleClick.bind(this));
        this.removeEventListener('keyup', this.handleKeyup.bind(this));

        this.formQuestions.forEach((formQuestion) => {
            formQuestion.removeEventListener('onValidityChange', this.updateIsValid.bind(this));
        })
    }

    handleClick(e){}

    handleKeyup(e){}

    // @todo: temp, properly validate
    updateIsValid() {
        this.toggleSubmitBtn(this.formQuestions.length === this.querySelectorAll('.form-question[data-valid]').length);
    }

    /**
     * @param { boolean } isValid
     */
    toggleSubmitBtn(isValid) {
        if (isValid) {
            this.querySelector('.form-submit-btn').classList.remove('button-disabled');
        } else {
            this.querySelector('.form-submit-btn').classList.add('button-disabled');
        }
    }
}

customElements.define('c-form', CForm);


