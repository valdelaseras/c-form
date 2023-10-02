'use strict';

/**
 * Required CSS classes:
 *
 * .duplicable: the ( form-question ) element to allow duplicates for
 * .add-dupe-btn: a focusable element that will duplicate the 'duplicable' element on click / keyup
 */
class CDuplicableFormQuestion extends HTMLElement {
    constructor() {
        super();

        this.max = 0; // the allowed amount of duplicates
        this.count = 0; // the current amount of duplicates
        this.duplicableElement = undefined; // the element to duplicate
    }

    static get observedAttributes() {
        return ['data-count'];
    }


    /**
     * Connected callback
     */
    connectedCallback() {
        // set the data-max value to the attribute value, unless the set value is 0
        // the 0 check is to prevent accidental infinite duplicates
        if (this.hasAttribute('data-max') && this.getAttribute('data-max') !== '0') {
            this.max = this.getAttribute('data-max');
        } else {
            this.max = 4; // otherwise set the default value
        }

        this.duplicableElement = this.getDuplicableElement();

        this.addEventListener('keyup', this.handleKeyup.bind(this));
        this.addEventListener('click', this.handleClick.bind(this));
    }


    /**
     * Disconnected callback
     */
    disconnectedCallback() {
        this.removeEventListener('keyup', this.handleKeyup.bind(this));
        this.removeEventListener('click', this.handleClick.bind(this));
    }


    /**
     * Attribute changed callback
     */
    attributeChangedCallback(count) {
        if (this.max - this.getAttribute(count) <= 0) {
            this.querySelector('.add-dupe-btn').classList.add('btn-disabled');
        } else if (this.querySelector('.add-dupe-btn.button-disabled')) {
            this.querySelector('.add-dupe-btn').classList.remove('btn-disabled');
        }
    }


    /**
     * Handle click events
     *
     * @param { Event } e
     */
    handleClick(e){
        if (e.target === this.querySelector('.add-dupe-btn')) {
            this.addDuplicate();
        }
    }


    /**
     * Handle keyup events
     *
     * @param { KeyboardEvent } e
     */
    handleKeyup(e){
        if (e.code === 'Enter') {
            if (e.target === this.querySelector('.add-dupe-btn')) {
                if (!this.querySelector('.add-dupe-btn.button-disabled')) {
                    this.addDuplicate();
                }
            }
            if (e.target === this.querySelector('.remove-dupe-btn')) {
                this.removeDuplicate(e);
            }
        }
    }


    /**
     * Get the element to duplicate
     *
     * @return { HTMLElement }
     */
    getDuplicableElement(){
        return this.querySelector('.duplicable');
    }


    /**
     * Add a dupe element
     */
    addDuplicate() {
        this.buildDuplicate();
        this.updateCount();
    }


    /**
     * Remove duped element
     */
    removeDuplicate(e){
        e.target.closest('.dupe').remove();

        this.updateCount();
    }


    /**
     * Build the dupe and attach a button to remove it
     */
    buildDuplicate() {
        const clonedNode = this.duplicableElement.createDupe();
        const removalBtn = this.buildRemovalBtn();

        clonedNode.append(removalBtn);

        this.appendChild(clonedNode);
    }


    /**
     * Build a simple dupe removal button
     *
     * @return { HTMLAnchorElement }
     */
    buildRemovalBtn() {
        const btn = document.createElement('a');

        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.classList.add('remove-dupe-btn');
        btn.innerText = "×";

        btn.addEventListener('click', this.removeDuplicate.bind(this));
        btn.addEventListener('keyup', this.handleKeyup.bind(this));

        return btn;
    }


    /**
     * Update this.count and data-count
     */
    updateCount() {
        this.count = this.querySelectorAll('.dupe').length;
        this.setAttribute('data-count', this.count);
    }
}

customElements.define('c-duplicable-form-question', CDuplicableFormQuestion);
