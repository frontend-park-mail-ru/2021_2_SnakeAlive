import Input from './input.js';
import Button from './button.js';

export default class Form {
	#div = document.createElement('div');

	#elem = document.createElement('form');

	#button = null;

	#inputs = [];

	constructor(given, parent) {
		this.#elem.method = 'POST';
		this.#elem.classList.add(given.cssClass);

		given.inputs.forEach(i => {
			this.#inputs.push(new Input(i.type, i.id, i.name, given.inputCssClass, this.#elem));
		});
		this.#button = new Button(
			given.button.text,
			given.button.cssClass,
			given.button.id,
			this.#elem
		);

		this.#div.appendChild(this.#elem);
		parent.appendChild(this.#div);
	}

	getValues() {
		const input = [];
		this.#inputs.forEach(i => input.push(i.getValue()));
		return input;
	}

	setButtonEvent(handler) {
		this.#elem.addEventListener('click', evt => {
			if (this.#button.isIt(evt.target)) {
				evt.preventDefault();
				this.#inputs.forEach(i => i.clearErrors());

				handler(...this.getValues()).catch(e => this.setError(e));
			}
		});
	}

	setError(error) {
		this.#inputs.forEach(i => {
			if (i.getId() === error.errorField) {
				i.setError(error.message);
			}
		});
	}
}
