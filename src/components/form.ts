import { Input, Button, FormConfig } from './index';

import * as popup from '../templates/popup.handlebars';

/** Класс соответствует html-форме */
class Form {
	#elem: HTMLFormElement;

	#error: HTMLElement;

	#button: Button;

	#inputs: Array<Input> = [];

	#closeBtn: Button | undefined;

	constructor(config: FormConfig, parent: HTMLElement) {
		const formHTML = new HTMLFormElement();
		formHTML.method = 'POST';
		formHTML.id = config.formId;
		formHTML.classList.add(config.cssClass);
		this.#elem = formHTML;

		const name = new HTMLHeadingElement();
		name.classList.add('formName');
		formHTML.appendChild(name);

		const errHTML = new HTMLDivElement();
		errHTML.id = 'formErrorBlock';
		errHTML.classList.add('formErrorBlock');
		errHTML.textContent = 'ошибок нет';
		formHTML.appendChild(errHTML);
		this.#error = errHTML;

		config.inputs.forEach(input => {
			const inputHTML = new HTMLInputElement();
			inputHTML.id = input.id;
			inputHTML.type = input.type;
			inputHTML.placeholder = input.name;
			inputHTML.classList.add('startInput');
			formHTML.appendChild(inputHTML);
			this.#inputs.push(new Input(inputHTML));
		});

		const btn = new HTMLButtonElement();
		btn.id = config.button.id;
		btn.classList.add(config.button.cssClass);
		btn.innerText = config.button.text;
		formHTML.appendChild(btn);
		this.#button = new Button(btn);

		parent.appendChild(formHTML);

		const closeBtn = document.getElementById('btnClose');
		if (closeBtn !== null) {
			this.#closeBtn = new Button(closeBtn);
			this.#closeBtn.addClickListener(config.closeCallback);
			this.#closeBtn.setActive();
		}
	}

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @return {Object.<String, String>} Объект где ключ - id поля ввода, значение - введенная пользователем строка
	 */
	getValues = (): Map<string, string> => {
		const result: Map<string, string> = new Map();
		this.#inputs.forEach(input => {
			result.set(input.getId(), input.getValue());
		});
		return result;
	};

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @param {function} action Функция, которая вызывается по нажатию submit кнопки формы
	 * @param {function[]} callbacks Массив функций, обрабатывающих результат работы action
	 * @return {null}
	 */
	setButtonEvent(
		action: (values: Map<string, string>) => Promise<Response>,
		callbacks: Array<(response: Response) => void>
	) {
		this.#elem.addEventListener('click', evt => {
			if (this.#button.isIt(evt.target)) {
				evt.preventDefault();
				this.#inputs.forEach(input => input.clearErrors());
				action(this.getValues())
					.then(response => {
						callbacks.forEach(callback => callback(response));
					})
					.catch(err => this.setError(err));
			}
		});
	}

	/** Функция показывает в форме ошибку: показывает ее текст и указывает поле, в котором содержится ошибка */
	setError(error: Error) {
		// FormValidationError
		this.#inputs.forEach(input => {
			// if (input.getId() === error.errorField) {
			// 	input.setError();
			// }
		});
		this.#error.innerHTML = error.message;
		this.#error.classList.add('err');
	}
}

/** Функция возвращает html верстку формы по FormConfig */
const formHTML = (config: FormConfig) => popup(config);

export { Form, formHTML };
