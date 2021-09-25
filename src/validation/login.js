import { validateEmail, checkEmpty, checkLength } from './common.js';

export function validateLoginData(input) {
	return checkEmpty(input.email, 'email')
		.then(() => checkEmpty(input.pswd, 'pswd'))
		.then(() => checkLength(input.pswd, 4, 'pswd'))
		.then(() => validateEmail(input.email, 'email'));
}
