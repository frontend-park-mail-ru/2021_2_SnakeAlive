import { ValidationError } from './error.js';

const checkEmpty = (value = '', name = '') => {
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
	const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (!re.test(String(value).toLowerCase())) {
		return Promise.reject(new ValidationError('неверная электронная почта', name));
	}

	return Promise.resolve();
};

export { validateEmail, checkEmpty, checkLength };
