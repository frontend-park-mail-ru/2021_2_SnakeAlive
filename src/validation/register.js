import { validateEmail, checkEmpty, checkLength } from './common.js';

export function validateRegisterData(registerInputs) {
	return checkEmpty(registerInputs.email, 'email')
		.then(() => checkEmpty(registerInputs.pswd, 'pswd'))
		.then(() => checkEmpty(registerInputs.name, 'name'))
		.then(() => checkEmpty(registerInputs.surname, 'surname'))
		.then(() => checkLength(registerInputs.pswd, 8, 'pswd'))
		.then(() => validateEmail(registerInputs.email, 'email'));
}
