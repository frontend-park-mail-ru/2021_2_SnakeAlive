import { validateEmail, checkIsEmpty, checkLength } from './common.js';

export function validateLoginData(input) {
	const result = [];
	let res;
	res = checkIsEmpty(input.email, 'email');
	if (res != null) {
		result.push(res);
	} else {
		res = validateEmail(input.email, 'email');
		if (res != null) {
			result.push(res);
		}
	}
	res = checkIsEmpty(input.pswd, 'pswd');
	if (res != null) {
		result.push(res);
	} else {
		res = checkLength(input.pswd, 8, 'pswd');
		if (res != null) {
			result.push(res);
		}
	}
	return result;
}
