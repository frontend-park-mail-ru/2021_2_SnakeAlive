import { validateEmail, checkEmpty, checkLength } from './common.js';

export function validateRegisterData(name = '', surname = '', email = '', password = '') {
	return checkEmpty(email, 'email')
		.then(() => checkEmpty(password, 'pswd'))
		.then(() => checkEmpty(name, 'name'))
		.then(() => checkEmpty(surname, 'surname'))
		.then(() => checkLength(password, 8, 'pswd'))
		.then(() => validateEmail(email, 'email'));
}
