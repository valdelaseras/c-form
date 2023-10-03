import {CFormQuestion} from "../CFormQuestion.js";

class CSelect extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * Connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('change', this.handleChange.bind(this));
    }

    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('change', this.handleChange.bind(this));
    }


    /**
     * Handle change events
     */
    handleChange(){
        this.updateState();
    }


    /**
     * Add and remove the custom 'data-is-valid' attribute
     */
    setValidityState() {
        if (this.isRequired) {
            // if there is a disabled option...
            if (!!this.querySelector('option[disabled]')){
                // if there were to be no check for a pristine state...
                super.setHelperText('error', 'This field is required');
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
}

customElements.define('c-select', CSelect);
