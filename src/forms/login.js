import { validateLoginData, ValidationError } from '../validation/index.js';
import { sendPostJSONRequest } from '../http/index.js';
import { FormConfig, Form, formHTML } from '../components/index.js';
import { backendEndpoint, loginURI } from '../constants/index.js';
import { flushPopup } from './flush_popup.js';
import { showCountrySights } from './country_sights.js';

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

const showLoginForm = () => {
	const formInfo = new FormConfig(
		'loginForm',
		'Вход',
		'startForm',
		{
			text: 'Войти',
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
