'use strict';

import {CInput} from "./c-input.js";

/**
 * Required CSS classes:
 *
 * - duplicate-field-btn: a button ( or element of choice ) that will duplicate the field
 * - remove-field-btn: a button ( or element of choice ) that will remove a duplicated field
 * - duplicable-field: the field to duplicate. The field must be a c-input element
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
        // the 0 check is to prevent accidental infinite duplicates
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
        if (this.max - this.getAttribute(count) <= 0) {
            this.querySelector('.duplicate-field-btn').classList.add('button-disabled');
        } else if (this.querySelector('.duplicate-field-btn.button-disabled')) {
            this.querySelector('.duplicate-field-btn').classList.remove('button-disabled');
        }
    }


    /**
     * @param { Event } e
     */
    handleClick(e){
        if (e.target === this.querySelector('.duplicate-field-btn')) {
            this.addDuplicate();
        }
    }


    /**
     * @param { KeyboardEvent } e
     */
    handleKeyup(e){
        if (e.code === 'Enter') {
            if (e.target === this.querySelector('.duplicate-field-btn')) {
                if (!this.querySelector('.duplicate-field-btn.button-disabled')) {
                    this.addDuplicate();
                }
            }
            if(e.target === this.querySelector('.remove-field-btn')) {
                this.removeDuplicate(e);
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
    removeDuplicate( e ){
        e.target.closest('c-input').remove();

        this.updateCount();
    }


    /**
     * Build a duplicate field element
     */
    buildDuplicate() {
        // clone the original duplicable field
        const clonedNode = this.duplicableField.cloneNode(true);

        clonedNode.querySelector('small').remove();

        clonedNode.classList.remove('duplicable-field');
        clonedNode.classList.add('duplicate-field');

        const dupeId = clonedNode.querySelector('input').id += `-${this.count}`;

        clonedNode.querySelector('input').id = dupeId;
        clonedNode.querySelector('label').setAttribute('for', dupeId);

        // clear any values of the original field
        clonedNode.querySelector('input').value = '';

        // add a button to remove the duplicate field if desired
        const removalBtn = this.buildRemovalBtn( clonedNode );
        // append it
        clonedNode.append(removalBtn);
        // attach listeners to the button
        removalBtn.addEventListener('click', this.removeDuplicate.bind(this));
        removalBtn.addEventListener('keyup', this.handleKeyup.bind(this));

        // append the duplicated and updated field
        this.appendChild(clonedNode);
    }


    /**
     * Build a simple field removal button:
     *
     * <a role="button" class="remove-field-btn">
     *     x
     * </a>
     */
    buildRemovalBtn() {
        const btn = document.createElement('a');
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.classList.add('remove-field-btn');
        btn.innerText = "x";

        return btn;
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
