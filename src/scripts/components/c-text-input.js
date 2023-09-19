'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

class CTextInput extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * handle key up events
     * */
    handleKeyup(){
        this.updateIsValid();
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        if (this.isRequired){
            if (this.querySelector('input[type="text"]').value) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid')
            }
        } else {
            this.setAttribute('data-valid', '');
        }
    }
}

customElements.define('c-text-input', CTextInput);
