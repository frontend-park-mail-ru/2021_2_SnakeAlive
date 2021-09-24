import Input from './input.js';
import Button from './button.js';
import { returnToMain } from '../main.js';

export default class Form {
	#elem = null;
	#error = null;
	#button = null;
	#inputs = [];
	#closeBtn = null;

	constructor(given) {
		this.#elem = document.getElementById(given.formId);
		this.#error = document.getElementById('formErrorBlock');
		this.#button = new Button(document.getElementById(given.button.id));
		given.inputs.forEach(i => {
			this.#inputs.push(new Input(document.getElementById(i.id)));
		});
		this.#closeBtn = new Button(document.getElementById('btnClose'));
		this.#closeBtn.addClickListener(returnToMain);
		this.#closeBtn.setActive();
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
				i.setError();
			}
		});
		this.#error.innerHTML = error.message;
		this.#error.classList.add('err');
	}
}
