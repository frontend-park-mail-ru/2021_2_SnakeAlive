/** Класс соответствует одному полю ввода формы */
export default class Input {
	#elem = null;

	#err = null;

	name = null;

	/**
	 * Конструктор класса Input
	 * @constructor
	 * @param {Object} DOMelement Существующий html-элемент input
	 */
	constructor(DOMelement) {
		this.#elem = DOMelement;
		this.name = DOMelement.id;

		this.#err = document.getElementById(`err-${this.name}`);

		this.#elem.addEventListener('focusin', () => {
			this.#elem.classList.remove('err-input');
			// this.#err.style.visibility = 'hidden';
			this.#err.classList.remove('err');
		});
	}

	/** Выделяет input как содержащий ошибку
	 * @param {Error} error Ошибка, которую нужно показать в input
	 */
	setError(error) {
		this.#elem.classList.add('err-input');
		this.#err.innerHTML = error.message;
		// this.#err.style.visibility = 'visible';
		this.#err.classList.add('err');
	}

	/** Убирает отображение ошибки на input, если оно было */
	clearErrors() {
		this.#elem.classList.remove('err-input');
		// this.#err.style.visibility = 'hidden';
		this.#err.classList.remove('err');
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
