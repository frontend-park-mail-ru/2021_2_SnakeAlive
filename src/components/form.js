import Input from './input.js';
import Button from './button.js';
import { returnToMain } from '../main.js';

class Form {
	#elem = null;

	#error = null;

	#button = null;

	#inputs = [];

	#closeBtn = null;

	response = null;

	constructor(config) {
		this.#elem = document.getElementById(config.formId);
		this.#error = document.getElementById('formErrorBlock');
		this.#button = new Button(document.getElementById(config.button.id));
		config.inputs.forEach(i => {
			this.#inputs.push(new Input(document.getElementById(i.id)));
		});
		this.#closeBtn = new Button(document.getElementById('btnClose'));
		this.#closeBtn.addClickListener(returnToMain);
		this.#closeBtn.setActive();
	}

	getValues() {
		const input = {};
		this.#inputs.forEach(i => {
			input[i.getId()] = i.getValue();
		});
		return input;
	}

	setButtonEvent(handler) {
		this.#elem.addEventListener('click', evt => {
			if (this.#button.isIt(evt.target)) {
				evt.preventDefault();
				this.#inputs.forEach(i => i.clearErrors());
				handler(this.getValues())
				.then(response => {
					console.log(document.cookie);
					returnToMain(response);
				}, e => this.setError(e),);
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
};

const showForm = (config, parentElement) => {
	var template = Handlebars.templates.popup;
	var html = template(config);
	parentElement.innerHTML = html;
};

export {Form, showForm}