import Input from './input.js';
import Button from './button.js';

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
		config.inputs.forEach(i => {
			this.#inputs.push(new Input(document.getElementById(i.id)));
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
		const input = {};
		this.#inputs.forEach(i => {
			input[i.getId()] = i.getValue();
		});
		return input;
	}

	/**
	 * Получает из html значения всех полей ввода с их id
	 * @param {function} action Функция, которая вызывается по нажатию submit кнопки формы
	 * @param {Object.<String, String>} values Объект со значениями полей ввода, генерируемый методом getValues()
	 * @return {Promise} response При успешном выполнении внутри содерится http ответ
	 * @param {function[]} callbacks Массив функций, обрабатывающих результат работы action
	 */
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

	/**
	 * Функция показывает в форме ошибку: показывает ее текст и указывает поле, в котором содержится ошибка
	 * @param {Error} error Принимается ошибка.
	 */
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

/**
 * Функция возвращает html верстку формы по FormConfig
 * @param {FormConfig} config Объект класса FormConfig, содержащий необходимую информацию
 * @return {String} html разметка формы
 */
const formHTML = config => {
	const template = Handlebars.templates.popup;
	return template(config);
};

export { Form, formHTML };
