import { backendEndpoint, registerURI } from '../constants/bundle.js';
import { validateRegisterData, ValidationError } from '../validation/bundle.js';
import { sendPostJSONRequest } from '../http/bundle.js';

const registerUser = (name = '', surname = '', email = '', password = '') =>
	validateRegisterData(name, surname, email, password)
		.then(() =>
			sendPostJSONRequest(backendEndpoint + registerURI, {
				email,
				password,
				name,
				surname,
			})
		)
		.then(response => {
			if (response.status === 400) {
				return Promise.reject(
					new ValidationError('Пользователь с таким емэйлом уже существует', 'email')
				);
			}

			return response;
		});

export { registerUser };
