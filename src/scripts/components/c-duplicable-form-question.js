'use strict';

/**
 * Required CSS classes:
 *
 * .duplicable-element: the ( form-question ) element to allow duplicates for
 * .add-dupe-button: a focusable element, like a button, that will duplicate the 'duplicable-element' on click / keyup
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
            this.querySelector('.add-dupe-button').classList.add('button-disabled');
        } else if (this.querySelector('.add-dupe-button.button-disabled')) {
            this.querySelector('.add-dupe-button').classList.remove('button-disabled');
        }
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

        // todo: only queries the first dupes remove-dupe-button
        if (e.target === this.querySelector('.remove-dupe-button')) {
            this.removeDuplicate(e);
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

            // todo: only queries the first dupes remove-dupe-button
            if (e.target === this.querySelector('.remove-dupe-button')) {
                this.removeDuplicate(e);
                this.setCount();
            }
        }
    }


    /**
     * Get the element to duplicate
     *
     * @return { HTMLElement }
     */
    getDuplicableElement(){
        return this.querySelector('.duplicable-element');
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
        e.target.closest('.dupe').remove();
    }


    /**
     * Clone the 'duplicable-element' and attach a button to remove it
     *
     * @return { HTMLElement } clonedNode
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
     * @return { HTMLAnchorElement }
     */
    buildRemovalButton() {
        const button = document.createElement('a');

        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        // button.setAttribute('data-index', this.count);
        button.classList.add('button');
        button.classList.add('remove-dupe-button');
        button.innerText = "×";

        return button;
    }


    /**
     * Set this.count and data-count
     */
    setCount() {
        this.count = this.querySelectorAll('.dupe').length;
        this.setAttribute('data-count', this.count);
    }
}

customElements.define('c-duplicable-form-question', CDuplicableFormQuestion);
