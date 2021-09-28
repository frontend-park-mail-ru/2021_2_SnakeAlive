import { validateLoginData, ValidationError } from '../validation/index.js';
import { sendPostJSONRequest } from '../http/index.js';
import { FormConfig, Form, formHTML } from '../components/index.js';
import { backendEndpoint, loginURI } from '../constants/index.js';
import { flushPopup } from './flush_popup.js';
import { showCountrySights } from './country_sights.js';

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
const loginUser = input =>
	validateLoginData(input)
		.then(() => {
			const { email } = input;
			const password = input.pswd;
			return sendPostJSONRequest(backendEndpoint + loginURI, {
				email,
				password,
			});
		})
		.then(response => {
			if (response.status === 404) {
				return Promise.reject(
					new ValidationError('Не зарегистрирован такой пользователь', 'email')
				);
			}
			if (response.status === 400) {
				return Promise.reject(new ValidationError('Неверный пароль', 'pswd'));
			}

			return response;
		});

/**
 * Функция создает форму регистрации как объект и как код в html
 */
const showLoginForm = () => {
	const formInfo = new FormConfig(
		'loginForm',
		'Вход',
		'startForm',
		{
			text: 'Готово',
			id: 'login',
			cssClass: 'btn-black',
		},
		'startInput',
		[
			{
				type: 'email',
				name: 'Почта',
				id: 'email',
			},
			{
				type: 'password',
				name: 'Пароль',
				id: 'pswd',
			},
		],
		flushPopup
	);

	document.getElementById('popup-place').innerHTML = formHTML(formInfo);
	const loginForm = new Form(formInfo);
	loginForm.setButtonEvent(loginUser, [flushPopup, showCountrySights]);
};

export { showLoginForm };
