function validateNotEmpty(value: string): boolean {
	return !(value === '');
}

function validateLength(value: string, length: number): boolean {
	return value.length >= length;
}

function validateEqual(first: string, second: string) {
	return first === second;
}

function validateEmail(value: string): boolean {
	const re = /^\w+(?:\.\w*)*@\w+(?:\.\w*)+$/;
	return re.test(String(value));
}

export interface ErrorSetter {
	setError(): void;
	clean(): void;
}

export interface ValidationCallback {
	(): boolean;
}

export interface ValidationElement {
	validators: ValidationCallback[];
	errorSetters: ErrorSetter[];
}

function validateElements(elements: ValidationElement[]): boolean {
	let result = true;

	elements.forEach((elem: ValidationElement) => {
		let validationResult = true;

		elem.validators.forEach((validator: ValidationCallback) => {
			validationResult = validationResult && validator();
		});

		if (!validationResult) {
			elem.errorSetters.forEach((setter: ErrorSetter) => {
				setter.setError();
			});
		} else {
			elem.errorSetters.forEach((setter: ErrorSetter) => {
				setter.clean();
			});
		}

		result = result && validationResult;
	});

	return result;
}

export { validateNotEmpty, validateLength, validateEqual, validateElements, validateEmail };
