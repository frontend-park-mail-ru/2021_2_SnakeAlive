/** Класс соответствует кнопке. Создаается либо конструктором из существующего html элемента,
 * либо функцией makeButton по параметрам */
export default class Button {
	#elem = null;

	#listen = [];

	/**
	 * Создает кнопку по параметрам. Если объект класса уже содержал html элемент, он затирается
	 * @param {String} text Отображаемый текст на кнопке
	 * @param {String} styleClass Класс кнопки для html и css
	 * @param {String} id id кнопки для html
	 * @param {Object} parentElement html элемент, внутрь которого нужно добавить кнопку
	 */
	makeButton(text = 'кнопка', styleClass = '', id = '', parentElement) {
		this.#elem = document.createElement('button');
		this.#elem.id = id;
		this.#elem.innerHTML = text;

		parentElement.appendChild(this.#elem);
		this.#elem.classList.add(styleClass);
	}

	/**
	 * Конструктор класса Button
	 * @constructor
	 * @param {Object} DOMelement [= null] Существующий html-элемент.
	 */
	constructor(DOMelement = null) {
		this.#elem = DOMelement;
	}

	/**
	 * Эта восхитительный метод проверяет, передали в него тот же объект или нет
	 * @param {Object} obj Обычно объект типа Button, но это не обязательно
	 * @return {Boolean} True, если передан тот же объект класса Button. Иначе false
	 */
	isIt(obj) {
		return obj === this.#elem;
	}

	/**
	 * Метод принимает функцию и добавляет ее к массиву - полю класса listen
	 * @param {function} handler
	 */
	addClickListener(handler) {
		this.#listen.push(handler);
	}

	/**
	 * Метод проходит по массиву - полю класса listen и
	 * добавляет все содержащиеся там функции в обработчики нажатия на кнопку
	 */
	setActive() {
		this.#listen.forEach(handler => {
			this.#elem.addEventListener('click', handler);
		});
	}

	/**
	 * Метод проходит по массиву - полю класса listen и
	 * убирает их из фактических обработчиков нажатия на кнопку, позволяя временно ее отключить
	 */
	setPassive() {
		this.#listen.forEach(handler => {
			this.#elem.removeEventListener('click', handler);
		});
	}
}
