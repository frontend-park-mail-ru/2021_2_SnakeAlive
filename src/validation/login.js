import { validateEmail, checkEmpty, checkLength } from './common.js';

export function validateLoginData(email = '', password = '') {
	return checkEmpty(email, 'email')
		.then(() => checkEmpty(password, 'pswd'))
		.then(() => checkLength(password, 8, 'pswd'))
		.then(() => validateEmail(email, 'email'));
}
