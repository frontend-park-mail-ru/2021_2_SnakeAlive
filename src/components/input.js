export default class Input {
	#elem = null;

	name = null;

	/**
	 * Represents a book.
	 * @constructor
	 * @param {string} title - The title of the book.
	 * @param {string} author - The author of the book.
	 */
	constructor(DOMelement) {
		this.#elem = DOMelement;
		this.name = DOMelement.name;
		this.#elem.addEventListener('focusout', () => {
			this.#elem.classList.remove('err-input');
		});
	}

	setError() {
		this.#elem.classList.add('err-input');
	}

	clearErrors() {
		this.#elem.classList.remove('err-input');
	}

	getValue() {
		return this.#elem.value;
	}

	getId() {
		return this.#elem.id;
	}
}
