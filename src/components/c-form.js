'use strict';

class CForm extends HTMLElement {
    constructor() {
        super();

        this.isValid = false;
        this.formGroups = [];
    }

    connectedCallback(){
        // all the fields in the form. The 'c-form-group' class should be added to root c- form groups.
        this.formGroups = this.querySelectorAll('.c-form-group');

        this.updateIsValid();

        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('keyup', this.handleKeyup.bind(this));
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.handleClick.bind(this));
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
    }

    handleClick(e){}

    handleKeyup(e){}

    // todo; trigger on?
    updateIsValid() {
        this.isValid = this.formGroups.length === this.querySelectorAll('.c-form-group[data-valid]').length;
        this.toggleSubmitBtn();
    }

    toggleSubmitBtn() {
        if (this.isValid) {
            this.querySelector('.form-submit-btn').classList.remove('btn-disabled');
        } else {
            this.querySelector('.form-submit-btn').classList.add('btn-disabled');
        }
    }
}

customElements.define('c-form', CForm);


