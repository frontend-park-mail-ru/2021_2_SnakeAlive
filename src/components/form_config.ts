/**
 * Класс нужен для удобства создания формы.
 * Объект этого класса принимается html-шаблоном и конструктором класса Form
 */

class InputConfig {
	type = '';

	name = '';

	id = '';

	constructor(type: string, name: string, id: string) {
		this.type = type;
		this.name = name;
		this.id = id;
	}
}

class ButtonConfig {
	text = 'Готово';

	id = '';

	cssClass = '';

	constructor(text: string, id: string, cssClass: string) {
		this.text = text;
		this.id = id;
		this.cssClass = cssClass;
	}
}

class FormConfig {
	formId = '';

	formName = '';

	cssClass = '';

	button: ButtonConfig;

	inputCssClass = '';

	inputs: Array<InputConfig> = [];

	closeCallback: () => void;

	constructor(
		formId: string,
		formName: string,
		cssClass: string,
		button: ButtonConfig,
		inputCssClass: string,
		inputs: Array<InputConfig>,
		closeCallback: () => void
	) {
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
