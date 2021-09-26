class FormConfig {
	formId = '';

	formName = '';

	cssClass = '';

	button = {};

	inputCssClass = '';

	inputs = [];

	closeCallback = {};

	constructor(formId, formName, cssClass, button, inputCssClass, inputs, closeCallback) {
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
