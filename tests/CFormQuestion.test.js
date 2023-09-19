import {CFormQuestion} from "../src/scripts/CFormQuestion.js";

class CMock extends CFormQuestion {
    updateIsValid = jest.fn()
    handleKeyup = jest.fn()
    buildHelperElement = jest.fn().mockImplementation(() => super.buildHelperElement())
    setHelperText = jest.fn().mockImplementation(() => super.setHelperText('error', 'This field is required'))
    setAsterisk = jest.fn().mockImplementation(() => super.setAsterisk())
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

    it('should execute the buildHelperElement method', () => {
        expect(document.querySelector('c-mock').buildHelperElement).toHaveBeenCalled();
    });

    it('should execute the setHelperText method', () => {
        expect(document.querySelector('c-mock').setHelperText).toHaveBeenCalled();
    });

    it('should execute the setAsterisk method', () => {
        expect(document.querySelector('c-mock').setAsterisk).toHaveBeenCalled();
    });

    it('should build and append the helper element', () => {
        const mock = new CMock();
        mock.buildHelperElement();
        expect(mock.querySelector('.helper-text')).toBeTruthy();
    });

    it('should set the helper text status and message', () => {
        const mock = new CMock();
        mock.buildHelperElement();
        mock.setHelperText();
        expect(mock.querySelector('.font-color-error')).toBeTruthy();
        expect(mock.querySelector('.helper-text').innerText).toMatch('This field is required');
    });

    it('should add an asterisk to the label', () => {
        const mock = new CMock();
        mock.setAsterisk();
        expect(mock.querySelector('label').innerText).toContain('*');
    })
});


