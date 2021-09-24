export default class FormRequire {
	formId = '';

	formName = '';

	cssClass = '';

	button = {};

	inputCssClass = '';

	inputs = [];

	constructor(formId, formName, cssClass, button, inputCssClass, inputs) {
		this.formId = formId;
		this.formName = formName;
		this.cssClass = cssClass;
		this.button = button;
		this.inputCssClass = inputCssClass;
		this.inputs = inputs;
	}
}
