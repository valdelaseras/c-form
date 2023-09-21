'use strict';

/**
 * Let the user duplicate an input field ( as indicated by a 'duplicable-field' class ).
 * Use on input[type=text,tel,email,url]
 */
class CDuplicableField extends HTMLElement {
    constructor() {
        super();

        this.max = 0; // the allowed amount of duplicates
        this.count = 0; // the current amount of duplicates
        this.duplicableField = undefined; // the element to duplicate
    }

    static get observedAttributes() {
        return ['data-count'];
    }


    /**
     * on connected callback
     */
    connectedCallback() {
        // set the data-max value to the attribute value, unless the set value is 0
        // the 0 check is just to prevent accidental infinite duplicates
        if (this.hasAttribute('data-max') && this.getAttribute('data-max') !== '0') {
            this.max = this.getAttribute('data-max');
        } else {
            this.max = 4; // otherwise set the default value
        }

        this.getDuplicableField();

        this.addEventListener('click', this.handleClick.bind(this));
        this.addEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * on disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.handleClick.bind(this));
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
    }


    /**
     * attribute changed callback
     */
    attributeChangedCallback(count) {
        if (this.max - this.getAttribute(count) === 0) {
            this.querySelector('.duplicate-field-btn').classList.add('button-disabled');
        } else if (this.querySelector('.duplicate-field-btn.button-disabled')) {
            this.querySelector('.duplicate-field-btn').classList.remove('button-disabled');
        }
    }


    /**
     * @param { Event } e
     */
    handleClick(e){
        if ( e.target === this.querySelector('.duplicate-field-btn')) {
            this.addDuplicate();
        }
        if (e.target === this.querySelector('.remove-field-btn')) {
            this.removeDuplicate();
        }
    }


    /**
     * @param { KeyboardEvent } e
     */
    handleKeyup(e){
        if (e.code === 'Enter') {
            if (e.target === this.querySelector('.duplicate-field-btn')) {
                this.addDuplicate();
            }
            if (e.target === this.querySelector('.remove-field-btn')) {
                this.removeDuplicate();
            }
        }
    }


    /**
     * Get the (c-)field to duplicate
     */
    getDuplicableField(){
        this.duplicableField = this.querySelector('.duplicable-field');
    }


    /**
     * Add duplicated field
     */
    addDuplicate() {
        this.buildDuplicate();
        this.updateCount();
    }


    /**
     * Remove duplicated field
     */
    removeDuplicate(){
        this.updateCount();
    }


    /**
     * Build a duplicate field element:
     *
     * - clone the original duplicable field
     * - update to a unique id and label[for] by suffixing `-${this.count}`
     * - clear any values of the original field
     * - @todo small element fix ( don't want elements jumping around )
     * - append it
     */
    buildDuplicate() {
        const clonedNode = this.duplicableField.cloneNode(true);

        clonedNode.classList.remove('duplicable-field');
        clonedNode.classList.add('duplicate-field');

        const dupeId = clonedNode.querySelector('input').id += `-${this.count}`;

        clonedNode.querySelector('input').id = dupeId;
        clonedNode.querySelector('label').setAttribute('for', dupeId);

        clonedNode.querySelector('input').value = '';

        clonedNode.querySelector('small').remove();

        this.appendChild(clonedNode);
    }


    /**
     * Update this.count and data-count
     */
    updateCount() {
        this.count = this.querySelectorAll('.duplicate-field').length;
        this.setAttribute('data-count', this.count);
    }
}

customElements.define('c-duplicable-field', CDuplicableField);
