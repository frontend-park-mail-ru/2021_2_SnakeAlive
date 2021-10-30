class FormValidationError extends Error {
	errorField;

	constructor(message, field) {
		super(message);
		this.errorField = field;
	}
}

export { FormValidationError };
