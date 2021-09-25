class FormRequire {
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
class RegisterInputs {
	name = '';

	surname = '';

	email = '';

	pswd = '';

	constructor(_name, _surname, _email, _pswd) {
		this.name = _name;
		this.surname = _surname;
		this.email = _email;
		this.pswd = _pswd;
	}
}
export { FormRequire, RegisterInputs };
