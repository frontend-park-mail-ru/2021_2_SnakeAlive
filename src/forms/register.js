import { backendEndpoint, registerURI } from '../constants';
import { validateRegisterData, ValidationError } from '../validation';
import { FormConfig, Form, formHTML } from '../components';
import { sendPostJSONRequest } from '../http';
import { flushPopup } from './flush_popup.js';

/**
 * Функция принимает объект, содержащий данные, введенные пользователем в форму. Возвращает promise
 *
 * @param {Object} registerInputs Объект, содержащий данные, введенные пользователем в форму
 * @param {String} registerInputs.name Имя пользователя
 * @param {String} registerInputs.surname Фамилия пользователя
 * @param {String} registerInputs.email Электронная почта пользователя
 * @param {String} registerInputs.pswd Пароль пользователя
 * @promise fPromise
 * @fulfill {Response} http response из fetch()
 * @reject {Error}
 * @returns fPromise
 */
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
/**
 * Функция конструирует и добавляет в index.html форму регистрации
 */
const showRegisterForm = () => {
	const formInfo = new FormConfig(
		'signupForm',
		'Регистрация',
		'startForm',
		{
			text: 'Поехали!',
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
	signupForm.setButtonEvent(registerUser, [flushPopup]);
};

export { showRegisterForm };
