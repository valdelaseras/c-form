import {CFormQuestion} from "../../CFormQuestion.js";

class CRadio extends CFormQuestion {
    constructor() {
        super();
    }

    // @todo: a radio will always? be in a group. Just need to check for any value if required I reckon

    setValidityState(){}

    handleKeyup(){}
}

customElements.define('c-radio', CRadio);
