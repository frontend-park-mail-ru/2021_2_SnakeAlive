const validateNotEmpty = (value: string): boolean => {
	return !(value === '');
};

const validateLength = (value: string, length: number): boolean => {
	return value.length >= length;
};

const validateEqual = (first: string, second: string) => {
	return first === second;
};

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

const validateElements = (elements: ValidationElement[]): boolean => {
	let result: boolean = true;

	elements.forEach((elem: ValidationElement) => {
		let validationResult = true;

		elem.validators.forEach(
			(validator: ValidationCallback) => (validationResult = validationResult && validator())
		);

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
};

export { validateNotEmpty, validateLength, validateEqual, validateElements };
