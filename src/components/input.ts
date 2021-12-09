const INPUT_ERROR = 'input-error-red';
const P_ERROR = 'input-error-red-text';

/** Класс соответствует одному полю ввода формы */
export default class Input {
	#elem: HTMLInputElement;

	name: string;

	#errorElem: HTMLParagraphElement;

	errorName: string;

	constructor(DOMelement: HTMLInputElement, errorElem: HTMLParagraphElement) {
		this.#elem = DOMelement;
		this.name = DOMelement.name;
		this.#errorElem = errorElem;
		this.errorName = errorElem.id;
		this.#elem.addEventListener('focusout', () => {
			this.#elem.classList.remove(INPUT_ERROR);
			this.#errorElem.classList.remove(P_ERROR);
		});
	}

	/** Выделяет input как содержащий ошибку */
	setError = (msg: string): void => {
		this.#elem.classList.add(INPUT_ERROR);
		this.#errorElem.classList.add(P_ERROR);
		this.#errorElem.textContent = msg;
	};

	/** Убирает отображение ошибки на input, если оно было */
	clearErrors = (): void => {
		this.#elem.classList.remove(INPUT_ERROR);
		this.#errorElem.classList.remove(P_ERROR);
	};

	/** Получает из html значение, введенное пользователем в input */
	getValue = (): string => this.#elem.value;

	/** Получает из html значение id input-а */
	getId = (): string => this.#elem.id;
}
