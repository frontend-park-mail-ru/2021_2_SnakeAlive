import { FormValidationError } from '../validation/index.js';
import { sendPostJSONRequest } from '../http/index.js';
import { backendEndpoint, loginURI } from '../constants/index.js';

/**
 * Функция принимает объект, содержащий данные, введенные пользователем в форму.
 * Возвращает promise c http ответом
 *
 * @param {Object} input Объект, содержащий данные, введенные пользователем в форму
 * @param {String} input.email Электронная почта пользователя
 * @param {String} input.pswd Пароль пользователя
 * @promise fPromise
 * @fulfill {Response} http response из fetch()
 * @reject {Error}
 * @returns fPromise
 */
export const loginUser = input => {
	const { email } = input;
	const password = input.pswd;
	return sendPostJSONRequest(backendEndpoint + loginURI, {
		email,
		password,
	}).then(response => {
		if (response.status === 404) {
			return Promise.reject(
				new FormValidationError('Не зарегистрирован такой пользователь', 'email')
			);
		}
		if (response.status === 400) {
			return Promise.reject(new FormValidationError('Неверный пароль', 'pswd'));
		}

		return response;
	});
};
