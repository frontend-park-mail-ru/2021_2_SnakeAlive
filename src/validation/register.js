import { validateEmail, checkIsEmpty, checkLength, checkIfEqual } from './common.js';

export function validateRegisterData(registerInputs) {
	const result = [];
	let res;
	res = checkIsEmpty(registerInputs.email, 'email');
	if (res != null) {
		result.push(res);
	} else {
		res = validateEmail(registerInputs.email, 'email');
		if (res != null) {
			result.push(res);
		}
	}
	res = checkIsEmpty(registerInputs.pswd, 'pswd');
	if (res != null) {
		result.push(res);
	} else {
		res = checkLength(registerInputs.pswd, 8, 'pswd');
		if (res != null) {
			result.push(res);
		}
	}
	res = checkIsEmpty(registerInputs.pswdRepeated, 'pswdRepeated');
	if (res != null) {
		result.push(res);
	} else {
		res = checkIfEqual(registerInputs.pswd, registerInputs.pswdRepeated, 'pswdRepeated');
		if (res != null) {
			result.push(res);
		}
	}
	res = checkIsEmpty(registerInputs.name, 'name');
	if (res != null) {
		result.push(res);
	}
	res = checkIsEmpty(registerInputs.surname, 'surname');
	if (res != null) {
		result.push(res);
	}
	return result;
}

