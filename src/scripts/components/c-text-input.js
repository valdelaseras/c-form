'use strict';

class CTextInput extends CFormGroup {
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
