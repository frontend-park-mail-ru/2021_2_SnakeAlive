export default class Input {
	//#divLine = document.createElement('div');

	//#div = document.createElement('div');

	// #elem = document.createElement('input');
	#elem = null;

	#p = null;

	// constructor(type, id, name, styleClass, parent) {
	// 	this.#elem.id = id;
	// 	this.#elem.type = type;
	// 	this.#elem.name = name;
	// 	this.#elem.placeholder = name;
	// 	this.#elem.classList.add(styleClass);

	// 	this.#elem.addEventListener('focusin', () => {
	// 		if (this.#p !== null) {
	// 			this.#div.removeChild(this.#p);
	// 			this.#p = null;
	// 		}
	// 	});

	// 	this.#divLine.classList.add('line');
	// 	this.#divLine.appendChild(this.#elem);
	// 	this.#div.appendChild(this.#divLine);

	// 	parent.appendChild(this.#div);
	// }
	constructor(DOMelement) {
		this.#elem = DOMelement;
		this.#elem.addEventListener('focusout', () => {
			// if (this.#p !== null) {
			// 	this.#div.removeChild(this.#p);
			// 	this.#p = null;
			// }
			this.#elem.classList.remove('err');
		});
	}

	setError() {
		// this.#p = document.createElement('span');
		// this.#p.classList.add('errStr');
		// this.#p.innerHTML = str;

		// this.#div.appendChild(this.#p);
		this.#elem.classList.add('err');
	}

	clearErrors() {
		// убрать картинку с восклицательныи знаком!!!!!!
		// if (this.#p !== null) {
		// 	this.#div.removeChild(this.#p);
		// }
		this.#elem.classList.remove('err');
	}

	getValue() {
		return this.#elem.value;
	}

	getId() {
		return this.#elem.id;
	}
}
