import Input from './input.js';
import Button from './button.js';

class Form {
	#elem = null;

	#error = null;

	#button = null;

	#inputs = [];

	#closeBtn = null;

	constructor(config) {
		this.#elem = document.getElementById(config.formId);
		this.#error = document.getElementById('formErrorBlock');
		this.#button = new Button(document.getElementById(config.button.id));
		config.inputs.forEach(i => {
			this.#inputs.push(new Input(document.getElementById(i.id)));
		});
		this.#closeBtn = new Button(document.getElementById('btnClose'));
		this.#closeBtn.addClickListener(config.closeCallback);
		this.#closeBtn.setActive();
	}

	getValues() {
		const input = {};
		this.#inputs.forEach(i => {
			input[i.getId()] = i.getValue();
		});
		return input;
	}

	setButtonEvent(action, callbacks) {
		this.#elem.addEventListener('click', evt => {
			if (this.#button.isIt(evt.target)) {
				evt.preventDefault();
				this.#inputs.forEach(i => i.clearErrors());
				action(this.getValues())
					.then(response => {
						callbacks.forEach(callback => callback(response));
					})
					.catch(e => this.setError(e));
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

const formHTML = (config) => {
	const template = Handlebars.templates.popup;
	return template(config);
};

export { Form, formHTML };
