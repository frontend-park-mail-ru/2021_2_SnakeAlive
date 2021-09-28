import { ValidationError } from './error.js';

const checkIsEmpty = (value = '', name = '') => {
	if (!value) {
		return Promise.reject(new ValidationError('заполните все поля', name));
	}

	return Promise.resolve();
};

const checkLength = (value = '', length = 0, name = '') => {
	if (value.length < length) {
		return Promise.reject(new ValidationError('пароль слишком короткий', name));
	}

	return Promise.resolve();
};

const validateEmail = (value = '', name = '') => {
	const re = /^\w+[.\w]+@\w+[.\w]+$/;
	if (!re.test(String(value))) {
		return Promise.reject(new ValidationError('неверная электронная почта', name));
	}

	return Promise.resolve();
};

const checkIfEqual = (pswdFirst = '', pswdSecond = '', name = 'pswdRepeated') => {
	if (pswdFirst === pswdSecond) {
		return Promise.resolve();
	}
	return Promise.reject(new ValidationError('Пароли не совпадают', name));
};

export { validateEmail, checkIsEmpty, checkLength, checkIfEqual };
