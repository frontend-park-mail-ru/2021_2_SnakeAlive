import Input from './input.js';
import Button from './button.js';
import { popup } from '../precompiled/index.js';

/** Класс соответствует html-форме */
class Form {
	#elem = null;

	#error = null;

	#button = null;

	#inputs = [];

	#closeBtn = null;

	/**
	 * Конструктор класса Form
	 * @constructor
	 * @param {FormConfig} config Объект класса FormConfig, содержащий необходимую информацию
	 */
	constructor(config) {
		this.#elem = document.getElementById(config.formId);
		this.#error = document.getElementById('formErrorBlock');
		this.#button = new Button(document.getElementById(config.button.id));
		config.inputs.forEach(input => {
			this.#inputs.push(new Input(document.getElementById(input.id)));
		});
		this.#closeBtn = new Button(document.getElementById('btnClose'));
		this.#closeBtn.addClickListener(config.closeCallback);
		this.#closeBtn.setActive();
	}

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @return {Object.<String, String>} Объект где ключ - id поля ввода, значение - введенная пользователем строка
	 */
	getValues() {
		const result = {};
		this.#inputs.forEach(input => {
			result[input.getId()] = input.getValue();
		});
		return result;
	}

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @param {function} preAction Функция, которая вызывается по нажатию submit кнопки формы и
	 * выполняется на клиенте. Возвращает boolean
	 * @param {function} action Функция, которая вызывается по нажатию submit кнопки формы и
	 * содержит поход к серверу. Возращает Promise
	 * @param {function[]} callbacks Массив функций, обрабатывающих результат работы action
	 * @return {null}
	 */
	setButtonEvent(preAction, action, callbacks) {
		this.#elem.addEventListener('click', evt => {
			if (this.#button.isIt(evt.target)) {
				evt.preventDefault();
				this.#inputs.forEach(input => input.clearErrors());
				const values = this.getValues();
				const preActionResult = preAction(values);
				if (preActionResult.length > 0) {
					preActionResult.forEach(err => this.setError(err));
				} else {
					action(values)
						.then(response => {
							callbacks.forEach(callback => callback(response));
						})
						.catch(err => this.setError(err));
				}
			}
		});
	}

	/**
	 * Функция показывает в форме ошибку: показывает ее текст и указывает поле, в котором содержится ошибка
	 * @param {Error} error Принимается ошибка.
	 */
	setError(error) {
		this.#inputs.forEach(input => {
			if (input.getId() === error.errorField) {
				input.setError(error);
			}
		});
	}
}

/**
 * Функция возвращает html верстку формы по FormConfig
 * @param {FormConfig} config Объект класса FormConfig, содержащий необходимую информацию
 * @return {String} html разметка формы
 */
const formHTML = config => popup(config);

export { Form, formHTML };
