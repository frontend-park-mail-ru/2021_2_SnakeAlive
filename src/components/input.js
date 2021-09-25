export default class Input {
	#elem = null;
	name = null;

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
