import {CFormQuestion} from "../src/scripts/CFormQuestion.js";

class CMock extends CFormQuestion {
    // connectedCallback = jest.fn().mockImplementation(() => super.connectedCallback());
    // attributeChangedCallback = jest.fn().mockImplementation(() => super.attributeChangedCallback());
    getKey = jest.fn().mockImplementation(() => super.getKey());
    getIsPristine = jest.fn().mockImplementation(() => super.getIsPristine());
    getIsValid = jest.fn().mockImplementation(() => super.getIsValid());
    setPristineState = jest.fn().mockImplementation(() => super.setPristineState());
    setAsterisk = jest.fn().mockImplementation(() => super.setAsterisk());
    setHelperText = jest.fn().mockImplementation(() => super.setHelperText('error', 'This field is required'));
    setHelperTextVisibility = jest.fn().mockImplementation(() => super.setHelperTextVisibility(false));
    createDupe = jest.fn().mockImplementation(() => super.createDupe());
    // updateState = jest.fn().mockImplementation(() => super.updateState());
}
customElements.define('c-mock', CMock);

describe('CFormQuestion', () => {
    beforeEach(() => {
        document.body.innerHTML += `
            <c-mock data-key="key">
                <label for="input">
                    Label
                </label>
                <input type="text" 
                       tabindex="0" 
                       id="input" 
                       required/>
                <p class="helper-text"></p>
            </c-mock>`
    });



    it('should call connectedCallback', () => {
        expect(document.querySelector('c-mock').isRequired).toBe(true);
        expect(document.querySelector('c-mock').hasAttribute('data-is-pristine')).toBeTruthy();
    });

    // it('should execute the setHelperText method', () => {
    //     expect(document.querySelector('c-mock').setHelperText).toHaveBeenCalled();
    // });
    //
    // it('should execute the setAsterisk method', () => {
    //     expect(document.querySelector('c-mock').setAsterisk).toHaveBeenCalled();
    // });
    //
    // it('should build and append the helper element', () => {
    //     const mock = new CMock();
    //     mock.buildHelperElement();
    //     expect(mock.querySelector('.helper-text')).toBeTruthy();
    // });
    //
    // it('should set the helper text status and message', () => {
    //     const mock = new CMock();
    //     mock.buildHelperElement();
    //     mock.setHelperText();
    //     expect(mock.querySelector('.font-color-error')).toBeTruthy();
    //     expect(mock.querySelector('.helper-text').innerText).toMatch('This field is required');
    // });
    //
    // it('should add an asterisk to the label', () => {
    //     const mock = new CMock();
    //     mock.setAsterisk();
    //     expect(mock.querySelector('label').innerText).toContain('*');
    // })
});


