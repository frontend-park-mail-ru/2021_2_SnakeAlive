import { validateEmail, checkIsEmpty, checkLength } from './common.js';

export function validateLoginData(input) {
	return checkIsEmpty(input.email, 'email')
		.then(() => checkIsEmpty(input.pswd, 'pswd'))
		.then(() => checkLength(input.pswd, 4, 'pswd'))
		.then(() => validateEmail(input.email, 'email'));
}
