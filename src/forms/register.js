import { backendEndpoint, registerURI } from '../constants/index.js';
import { FormValidationError } from '../validation/index.js';
import { sendPostJSONRequest } from '../http/index.js';

/**
 * Функция принимает объект, содержащий данные, введенные пользователем в форму. Возвращает promise
 *
 * @param {Object} registerInputs Объект, содержащий данные, введенные пользователем в форму
 * @param {String} registerInputs.name Имя пользователя
 * @param {String} registerInputs.surname Фамилия пользователя
 * @param {String} registerInputs.email Электронная почта пользователя
 * @param {String} registerInputs.pswd Пароль пользователя
 * @param {String} registerInputs.pswdRepeated Повтор пароля
 * @promise fPromise
 * @fulfill {Response} http response из fetch()
 * @reject {Error}
 * @returns fPromise
 */
export const registerUser = registerInputs => {
	const { email } = registerInputs;
	const password = registerInputs.pswd;
	const { name } = registerInputs;
	const { surname } = registerInputs;
	return sendPostJSONRequest(backendEndpoint + registerURI, {
		email,
		password,
		name,
		surname,
	}).then(response => {
		if (response.status === 400) {
			return Promise.reject(
				new FormValidationError('Пользователь с такой почтой уже существует', 'email')
			);
		}
		return response;
	});
};
