import {CFormQuestion} from "../../CFormQuestion.js";

class CRadio extends CFormQuestion {
    constructor() {
        super();
    }
}

customElements.define('c-radio', CRadio);
