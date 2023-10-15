'use strict';

import {CFormQuestion} from "../../CFormQuestion.js";
import {DataSource} from "../../DataSource.js";

class CSelect extends CFormQuestion {
    constructor() {
        super();
    }


    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        if (this.hasAttribute('data-external-options')) {
            const dataSource = DataSource[this.getAttribute('data-external-options')];

            if ( typeof dataSource === "function" ) {
                // we might use a Promise
                dataSource()
                    .then(response => {
                        this.populateSelect(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                // or data comes from a variable ( array )
                this.populateSelect(dataSource);
            }
        }

        this.addEventListener('change', this.handleChange.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('change', this.handleChange.bind(this));
    }


    /**
     * Get value
     *
     * @returns { string }
     */
    getValue(){
        return this.querySelector('select').value;
    }


    /**
     * Add and remove the custom 'data-is-valid' attribute
     */
    setValidityState() {
        if (this.isRequired) {
            // if there is a disabled option...
            if (!!this.querySelector('option[disabled]')){
                // if there were to be no check for a pristine state...
                if (this.querySelector('.helper-text')){
                    this.setHelperText('error', 'This field is required');
                }
                // when the value is no longer the disabled option value, a selection has been made
                if (this.querySelector('select').value !== this.querySelector('option[disabled]').value){
                    this.setAttribute('data-is-valid', '');
                }

                // if no disabled option is present, even if the select is required, there already is a valid value selected
            } else {
                this.setAttribute('data-is-valid', '');
            }
        } else {
            this.setAttribute('data-is-valid', '');
        }
    }


    /**
     * Handle change events
     */
    handleChange(){
        this.updateState();
    }


    /**
     * Maps the array elements and builds the option : HTMLOptionElement,
     * then appends all of them at once to select : HTMLSelectElement
     *
     * @param { {label: string, value: string }[] } elements
     */
    populateSelect(elements) {
        this.querySelector('select').append(
            ...elements.map(({label, value}) => this.buildOption(label, value))
        );
    }


    /**
     * Build an option element
     *
     * @param { string } label
     * @param { string } value
     *
     * @returns { HTMLOptionElement }
     */
    buildOption(label, value) {
        const option = document.createElement('option');

        option.setAttribute('value', value);
        option.innerText = label;

        return option;
    }
}

customElements.define('c-select', CSelect);
