export default class Button {
	#elem = document.createElement('button');

	constructor(text = 'кнопка', styleClass = '', id = '', parentElement = null) {
		this.#elem.id = id;
		this.#elem.innerHTML = text;

		parentElement.appendChild(this.#elem);
		this.#elem.classList.add(styleClass);
	}

	isIt(obj) {
		return obj === this.#elem;
	}

	addClickListener(handler) {
		this.#elem.addEventListener('click', handler);
	}
}
