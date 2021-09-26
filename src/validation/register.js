import { validateEmail, checkIsEmpty, checkLength } from './common.js';

export function validateRegisterData(registerInputs) {
	return checkIsEmpty(registerInputs.email, 'email')
		.then(() => checkIsEmpty(registerInputs.pswd, 'pswd'))
		.then(() => checkIsEmpty(registerInputs.name, 'name'))
		.then(() => checkIsEmpty(registerInputs.surname, 'surname'))
		.then(() => checkLength(registerInputs.pswd, 8, 'pswd'))
		.then(() => validateEmail(registerInputs.email, 'email'));
}
