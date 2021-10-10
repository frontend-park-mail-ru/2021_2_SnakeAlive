import { FormValidationError } from './error.js';

const checkIsEmpty = (value = '', name = '') => {
	if (!value) {
		return new FormValidationError('заполните все поля', name);
	}
	const MaxLength = 100;
	if (value.length > MaxLength) {
		return new FormValidationError('слишком длинное значение', name);
	}
	return null;
};

const checkLength = (value = '', length = 0, name = '') => {
	if (value.length < length) {
		return new FormValidationError('пароль слишком короткий', name);
	}
	return null;
};

const validateEmail = (value = '', name = '') => {
	const re = /^\w+(?:\.\w+)*@\w+(?:\.\w+)+$/;
	if (!re.test(String(value))) {
		return new FormValidationError('неверная электронная почта', name);
	}
	return null;
};

const checkIfEqual = (pswdFirst = '', pswdSecond = '', name = 'pswdRepeated') => {
	if (pswdFirst === pswdSecond) {
		return null;
	}
	return new FormValidationError('Пароли не совпадают', name);
};

export { validateEmail, checkIsEmpty, checkLength, checkIfEqual };
