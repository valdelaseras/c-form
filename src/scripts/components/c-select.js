import {CFormQuestion} from "../CFormQuestion.js";

class CSelect extends CFormQuestion {
    constructor() {
        super();
    }

    /**
     * connected callback
     */
    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('change', this.handleChange.bind(this));
    }

    /**
     * remove any listeners on disconnected callback
     */
    disconnectedCallback() {
        super.disconnectedCallback();

        this.removeEventListener('change', this.handleChange.bind(this));
    }


    /**
     * handle change events
     */
    handleChange(){
        this.updateIsValid()
    }


    /**
     * add and remove the custom 'data-valid' attribute
     */
    updateIsValid() {
        if (this.isRequired) {

            // if there is a disabled option...
            if (!!this.querySelector('option[disabled]')){
                // when the value is no longer the disabled option value, a selection has been made
                if (this.querySelector('select').value !== this.querySelector('option[disabled]').value){
                    this.setAttribute('data-valid', '');
                }

            // if no disabled option is present, even if the select is required, there already is a valid value selected
            } else {
                this.setAttribute('data-valid', '');
            }
        } else {
            this.setAttribute('data-valid', '');
        }
    }
}

customElements.define('c-select', CSelect);
