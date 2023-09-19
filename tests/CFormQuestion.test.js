import {CFormQuestion} from "../src/scripts/CFormQuestion.js";

class CMock extends CFormQuestion {
    updateIsValid(){}
    handleKeyup(){}
}
customElements.define('c-mock', CMock);

describe('CFormQuestion', () => {
    beforeEach(() => {
        document.body.innerHTML += `
            <c-mock>
                <label for="mock-input">Mock input</label>
                <input type="text" tabindex="0" id="mock-input" required/>
            </c-mock>`
    });

    it('should do something', () => {
        document.querySelector('c-mock input').value += 'test';
        expect(document.querySelector('c-mock').hasAttribute('data-valid')).toBeTruthy();
    });
});


