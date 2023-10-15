'use strict';

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
            this.querySelector('.add-dupe-button').classList.add('button-disabled');
        } else if (this.querySelector('.add-dupe-button.button-disabled')) {
            this.querySelector('.add-dupe-button').classList.remove('button-disabled');
        }

        this.dispatchEvent(new Event('duplicateCountUpdated', {bubbles: true}));
    }


    /**
     * Get the element to duplicate
     *
     * @returns { HTMLElement }
     */
    getDuplicableElement(){
        return this.querySelector('.duplicable-element');
    }



    /**
     * Set this.count and data-count
     */
    setCount() {
        this.count = this.querySelectorAll('.dupe').length;
        this.setAttribute('data-count', this.count);
    }


    /**
     * Handle click events
     *
     * @param { Event } e
     */
    handleClick(e){
        if (e.target === this.querySelector('.add-dupe-button')) {
            this.addDuplicate();
            this.setCount();
        }
    }


    /**
     * Handle keyup events
     *
     * @param { KeyboardEvent } e
     */
    handleKeyup(e){
        if (e.code === 'Enter') {
            if (e.target === this.querySelector('.add-dupe-button')) {
                if (!this.querySelector('.add-dupe-button.button-disabled')) {
                    this.addDuplicate();
                    this.setCount();
                }
            }
        }
    }


    /**
     * Add a dupe element
     */
    addDuplicate() {
        this.appendChild(this.buildDuplicate());
    }


    /**
     * Remove duped element
     */
    removeDuplicate(e){
        if (e.code === 'Enter' || e.type === 'click') {
            e.target.closest('.dupe').remove();
            this.setCount();
        }
    }


    /**
     * Clone the 'duplicable-element' and attach a button to remove it
     *
     * @returns { HTMLElement } clonedNode
     */
    buildDuplicate() {
        const clonedNode = this.duplicableElement.createDupe();
        const removalButton = this.buildRemovalButton();

        clonedNode.append(removalButton);

        return clonedNode;
    }


    /**
     * Build a simple dupe removal button
     *
     * @returns { HTMLAnchorElement }
     */
    buildRemovalButton() {
        const button = document.createElement('a');

        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        button.classList.add('button');
        button.classList.add('remove-dupe-button');
        button.innerText = "×";

        // listeners must be attached to the button
        button.addEventListener('click', this.removeDuplicate.bind(this));
        button.addEventListener('keyup', this.removeDuplicate.bind(this));

        return button;
    }
}

customElements.define('c-duplicable-form-question', CDuplicableFormQuestion);
