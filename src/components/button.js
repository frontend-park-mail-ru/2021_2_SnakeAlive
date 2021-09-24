export default class Button {
	#elem = null;
	#listen = [];

	makeButton(text = 'кнопка', styleClass = '', id = '', parentElement = null) {
		this.#elem = document.createElement('button');
		this.#elem.id = id;
		this.#elem.innerHTML = text;

		parentElement.appendChild(this.#elem);
		this.#elem.classList.add(styleClass);
	}
	constructor(DOMelement) {
		this.#elem = DOMelement;
	}

	isIt(obj) {
		return obj === this.#elem;
	}

	addClickListener(handler) {
		this.#listen.push(handler);
	}
	setActive() {
		this.#listen.forEach(handler => {
			this.#elem.addEventListener('click', handler);
		});
	}
	setPassive() {
		this.#listen.forEach(handler => {
			this.#elem.removeEventListener('click', handler);
		});
	}
}
