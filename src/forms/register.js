import { backendEndpoint, registerURI } from '../constants/bundle.js';
import { validateRegisterData, ValidationError } from '../validation/bundle.js';
import { FormConfig, Form } from '../components/bundle.js';
import { sendPostJSONRequest } from '../http/bundle.js';

const registerUser = (registerInputs) => {
	return validateRegisterData(registerInputs)
		.then(() => {
			const email = registerInputs.email;
			const password = registerInputs.pswd;
			const name = registerInputs.name;
			const surname = registerInputs.surname;
			return sendPostJSONRequest(backendEndpoint + registerURI, {
				email,
				password,
				name,
				surname,
			})
		})
		.then(response => {
			if (response.status === 400) {
				return Promise.reject(
					new ValidationError('Пользователь с такой почтой уже существует', 'email')
				);
			}
			return response;
		});
};

const showRegisterForm = () => {
	var source = document.getElementById('template-popup-form').innerHTML;
	var template = Handlebars.compile(source);

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
		]
	);
	var html = template(formInfo);
	document.getElementById('popup-place').innerHTML = html;

	const signupForm = new Form(formInfo);
	signupForm.setButtonEvent(registerUser);
};

export { showRegisterForm, registerUser };
