import { Input, Button, FormConfig } from '@/components';

import popup from '@/templates/popup.handlebars';

/** Класс соответствует html-форме */
class Form {
	#elem: HTMLFormElement;

	#error: HTMLElement;

	#button: Button;

	#inputs: Array<Input> = [];

	constructor(config: FormConfig, parent: Element) {
		const formHTML = document.createElement('form');
		formHTML.method = 'POST';
		formHTML.id = config.formId;
		formHTML.classList.add(config.cssClass);
		this.#elem = formHTML;

		const name = document.createElement('h2');
		name.classList.add('formName');
		formHTML.appendChild(name);

		const errHTML = document.createElement('div');
		errHTML.id = 'formErrorBlock';
		errHTML.classList.add('formErrorBlock');
		errHTML.textContent = 'ошибок нет';
		formHTML.appendChild(errHTML);
		this.#error = errHTML;

		config.inputs.forEach(input => {
			const inputHTML: HTMLInputElement = document.createElement('input');
			inputHTML.id = input.id;
			inputHTML.type = input.type;
			inputHTML.placeholder = input.name;
			inputHTML.classList.add('startInput');
			formHTML.appendChild(inputHTML);
			this.#inputs.push(new Input(inputHTML));
		});

		const btn = document.createElement('button');
		btn.id = config.button.id;
		btn.classList.add(config.button.cssClass);
		btn.innerText = config.button.text;
		formHTML.appendChild(btn);
		this.#button = new Button(btn);

		parent.appendChild(formHTML);
		console.log(parent);
	}

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @return {Object.<String, String>} Объект где ключ - id поля ввода, значение - введенная пользователем строка
	 */
	getValues = (): {[key: string]: string} => {
		// const result: Map<string, string> = new Map();
		const result: {[key: string]: string} = {};
		this.#inputs.forEach(input => {
			result[input.getId()] =  input.getValue();
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
		action: (values: {[key: string]: string}) => void,
		// callbacks: Array<(response: Response) => void>
	) {
		this.#elem.addEventListener('click', evt => {
			if (this.#button.isIt(evt.target)) {
				evt.preventDefault();
				this.#inputs.forEach(input => input.clearErrors());
				action(this.getValues());
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
