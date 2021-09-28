/**
 * Класс нужен для удобства создания формы.
 * Объект этого класса принимается html-шаблоном и конструктором класса Form
 */
class FormConfig {
	formId = '';

	formName = '';

	cssClass = '';

	button = {};

	inputCssClass = '';

	inputs = [];

	closeCallback = {};

	/**
	 * Конструктор класса FormConfig
	 * @constructor
	 * @typedef {Object} FormConfig
	 * @param {String} formId id формы для html
	 * @param {String} formName Отображаемое на странице название формы
	 * @param {String} cssClass Класс формы для html и css. Например, "startForm"
	 * @param {Object} button Информация для создания submit-кнопки. Включает text, id, cssClass
	 * @param {String} button.text Отображаемый текст на кнопке
	 * @param {String} button.id id кнопки для html
	 * @param {String} button.cssClass Класс кнопки для html и css
	 * @param {String} inputCssClass Класс, который проставится всем полям ввода формы (для css)
	 * @param {Object[]} inputs Информация для создания полей ввода. Включает type, name, id
	 * @param {String} inputs[].type Тип ввода в html. Например, если передать password - текст отображается точками
	 * @param {String} inputs[].name Отображаемый в поле до начала ввода текст
	 * @param {String} inputs[].id id поля ввода для html
	 * @param {function} closeCallback [= null] Функция, которая вызывается по нажатию на кнопку закрытия формы (в случае с popup крестик в углу)
	 */
	constructor(formId, formName, cssClass, button, inputCssClass, inputs, closeCallback = null) {
		this.formId = formId;
		this.formName = formName;
		this.cssClass = cssClass;
		this.button = button;
		this.inputCssClass = inputCssClass;
		this.inputs = inputs;
		this.closeCallback = closeCallback;
	}
}

export { FormConfig };
