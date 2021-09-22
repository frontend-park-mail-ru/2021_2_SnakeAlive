export default class FormRequire {
	cssClass = '';

	button = {};

	inputCssClass = '';

	inputs = [];

	constructor(cssClass, button, inputCssClass, inputs) {
		this.cssClass = cssClass;
		this.button = button;
		this.inputCssClass = inputCssClass;
		this.inputs = inputs;
	}
}
