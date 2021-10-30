const __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === 'm') throw new TypeError('Private method is not writable');
		if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
		if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError(
				'Cannot write private member to an object whose class did not declare it'
			);
		return (
			kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value),
			value
		);
	};
const __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
		if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError(
				'Cannot read private member from an object whose class did not declare it'
			);
		return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
let _Button_elem;
let _Button_listen;
Object.defineProperty(exports, '__esModule', { value: true });
/** Класс соответствует кнопке. Создаается либо конструктором из существующего html элемента,
 * либо функцией makeButton по параметрам */
class Button {
	/**
	 * Конструктор класса Button
	 * @constructor
	 * @param {Object|null} DOMelement Существующий html-элемент.
	 */
	constructor(DOMelement) {
		_Button_elem.set(this, void 0);
		_Button_listen.set(this, []);
		/**
		 * Метод проверяет, передали в него тот же объект или нет
		 * @param {Object} obj Обычно объект типа Button, но это не обязательно
		 * @return {Boolean} True, если передан тот же объект класса Button. Иначе false
		 */
		this.isIt = obj => obj === __classPrivateFieldGet(this, _Button_elem, 'f');
		/**
		 * Метод принимает функцию и добавляет ее к массиву - полю класса listen
		 * @param {function} handler
		 */
		this.addClickListener = handler => {
			__classPrivateFieldGet(this, _Button_listen, 'f').push(handler);
		};
		__classPrivateFieldSet(this, _Button_elem, DOMelement, 'f');
	}

	/**
	 * Создает кнопку по параметрам. Если объект класса уже содержал html элемент, он затирается
	 * @param {String} text Отображаемый текст на кнопке
	 * @param {String} styleClass Класс кнопки для html и css
	 * @param {String} id id кнопки для html
	 * @param {Object} parentElement html элемент, внутрь которого нужно добавить кнопку
	 */
	makeButton(text = 'кнопка', styleClass = '', id = '', parentElement) {
		__classPrivateFieldSet(this, _Button_elem, document.createElement('button'), 'f');
		__classPrivateFieldGet(this, _Button_elem, 'f').id = id;
		__classPrivateFieldGet(this, _Button_elem, 'f').innerHTML = text;
		parentElement.appendChild(__classPrivateFieldGet(this, _Button_elem, 'f'));
		__classPrivateFieldGet(this, _Button_elem, 'f').classList.add(styleClass);
	}

	/**
	 * Метод проходит по массиву - полю класса listen и
	 * добавляет все содержащиеся там функции в обработчики нажатия на кнопку
	 */
	setActive() {
		__classPrivateFieldGet(this, _Button_listen, 'f').forEach(handler => {
			if (__classPrivateFieldGet(this, _Button_elem, 'f') !== undefined) {
				__classPrivateFieldGet(this, _Button_elem, 'f').addEventListener('click', handler);
			}
		});
	}

	/**
	 * Метод проходит по массиву - полю класса listen и
	 * убирает их из фактических обработчиков нажатия на кнопку, позволяя временно ее отключить
	 */
	setPassive() {
		__classPrivateFieldGet(this, _Button_listen, 'f').forEach(handler => {
			if (__classPrivateFieldGet(this, _Button_elem, 'f') !== undefined) {
				__classPrivateFieldGet(this, _Button_elem, 'f').removeEventListener('click', handler);
			}
		});
	}
}
exports.default = Button;
(_Button_elem = new WeakMap()), (_Button_listen = new WeakMap());
