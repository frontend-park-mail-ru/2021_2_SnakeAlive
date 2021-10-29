/** Класс соответствует одному полю ввода формы */
export default class Input {
	#elem: HTMLInputElement;

	name: string;

	constructor(DOMelement: HTMLInputElement) {
		this.#elem = DOMelement;
		this.name = DOMelement.name;
		this.#elem.addEventListener('focusout', () => {
			this.#elem.classList.remove('err-input');
		});
	}

	/** Выделяет input как содержащий ошибку */
	setError = (): void => {
		this.#elem.classList.add('err-input');
	}

	/** Убирает отображение ошибки на input, если оно было */
	clearErrors = (): void => {
		this.#elem.classList.remove('err-input');
	}

	/** Получает из html значение, введенное пользователем в input */
	getValue = (): string => this.#elem.value;

	/** Получает из html значение id input-а */
	getId = (): string => this.#elem.id;
}
