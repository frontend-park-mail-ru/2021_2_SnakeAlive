import { backendEndpoint, registerURI } from '../constants/index.js';
import { validateRegisterData, ValidationError } from '../validation/index.js';
import { FormConfig, Form, formHTML } from '../components/index.js';
import { sendPostJSONRequest } from '../http/index.js';
import { flushPopup } from './flush_popup.js';
import { showCountrySights } from './country_sights.js';

const registerUser = registerInputs =>
	validateRegisterData(registerInputs)
		.then(() => {
			const { email } = registerInputs;
			const password = registerInputs.pswd;
			const { name } = registerInputs;
			const { surname } = registerInputs;
			return sendPostJSONRequest(backendEndpoint + registerURI, {
				email,
				password,
				name,
				surname,
			});
		})
		.then(response => {
			if (response.status === 400) {
				return Promise.reject(
					new ValidationError('Пользователь с такой почтой уже существует', 'email')
				);
			}
			return response;
		});

const showRegisterForm = () => {
	const formInfo = new FormConfig(
		'signupForm',
		'Регистрация',
		'startForm',
		{
			text: 'Ок',
			id: 'signup',
			cssClass: 'btn-black',
		},
		'startInput',
		[
			{
				type: 'text',
				name: 'Имя',
				id: 'name',
			},
			{
				type: 'text',
				name: 'Фамилия',
				id: 'surname',
			},
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

	const signupForm = new Form(formInfo);
	signupForm.setButtonEvent(registerUser, [flushPopup, showCountrySights]);
};

export { showRegisterForm };
