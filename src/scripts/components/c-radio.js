class CRadio extends CFormQuestion {
    constructor() {
        super();
    }

    // @todo: a radio will always? be in a group so think this component through carefully

    updateIsValid(){
        console.log('todo: isvalid');
    }

    handleKeyup(){
        console.log('todo: handlekeyup');
    }
}

customElements.define('c-radio', CRadio);
