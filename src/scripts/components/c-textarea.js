'use strict';

import {CFormQuestion} from "../CFormQuestion.js";

class CTextarea extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        this.setCounter('.maxlength', this.querySelector( 'textarea' ).getAttribute('maxlength' ));
        this.setCounter('.counter', this.querySelector( 'textarea' ).getAttribute('maxlength' ));
    }


    /**
     * Handle keyup event
     */
    handleKeyup(){
        this.setCounter( '.counter', (this.querySelector( 'textarea' ).getAttribute('maxlength' ) - this.querySelector( 'textarea' ).value.length ).toString() );
        this.updateIsValid();
    }


    /**
     * Set a counter value in a target element
     *
     * @param { string } targetSelector
     * @param { string } count - the (string) number to set in the target element
     */
    setCounter( targetSelector, count ) {
        this.querySelector( targetSelector ).innerText = count;
    }


    /**
     * Add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        if (this.isRequired){
            if (this.querySelector('textarea').value) {
                this.setAttribute('data-valid', '');
            } else {
                this.removeAttribute('data-valid')
            }
        } else {
            this.setAttribute('data-valid', '');
        }
    }
}

window.customElements.define('c-textarea', CTextarea );
