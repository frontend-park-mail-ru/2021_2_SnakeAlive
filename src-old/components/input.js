/** Класс соответствует одному полю ввода формы */
export default class Input {
	#elem = null;

	name = null;

	/**
	 * Конструктор класса Input
	 * @constructor
	 * @param {Object} DOMelement Существующий html-элемент input
	 */
	constructor(DOMelement) {
		this.#elem = DOMelement;
		this.name = DOMelement.name;
		this.#elem.addEventListener('focusout', () => {
			this.#elem.classList.remove('err-input');
		});
	}

	/** Выделяет input как содержащий ошибку */
	setError() {
		this.#elem.classList.add('err-input');
	}

	/** Убирает отображение ошибки на input, если оно было */
	clearErrors() {
		this.#elem.classList.remove('err-input');
	}

	/**
	 * Получает из html значение, введенное пользователем в input
	 * @return {String} Строка, введенная пользователем
	 */
	getValue() {
		return this.#elem.value;
	}

	/**
	 * Получает из html значение id input-а
	 * @return {String} id input-а
	 */
	getId() {
		return this.#elem.id;
	}
}
