import {CFormQuestion} from "../../CFormQuestion.js";

class CRadio extends CFormQuestion {
    constructor() {
        super();
    }

    setValidityState(){}
}

customElements.define('c-radio', CRadio);
