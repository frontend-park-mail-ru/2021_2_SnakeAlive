import { dispatcher, EventType, LoginData, ValidationErrData } from '@/dispatcher';
import { newSetEmptyHeaderRequest, newSetMainHeaderStrongRequest } from '@/actions/header';
import { setValidationErrorLogin } from '@/actions/auth';
import { sendPostJSONRequest } from '@/http';
import { backendEndpoint, loginURI, pathsURLfrontend } from '@/constants';
import { router } from '@/router';

export default class LoginReducer {
	init = () => {
		dispatcher.register(EventType.SUBMIT_LOGIN_DATA, this.login);
		dispatcher.notify(newSetEmptyHeaderRequest(false));
	};

	login = (input: LoginData) => {
		const result: ValidationErrData = {
			data: [],
		};

		sendPostJSONRequest(backendEndpoint + loginURI, input)
			.then(response => {
				if (response.status === 400) {
					result.data.push({ error: 'Неверный пароль', name: 'wrong_password' });
					return Promise.reject();
				}
				if (response.status === 404) {
					result.data.push({ error: 'Пользователь не найден', name: 'wrong_email' });
					return Promise.reject();
				}
				if (response.status === 400) {
					result.data.push({ error: 'Некорректные данные', name: 'wrong_password' });
					result.data.push({ error: 'Некорректные данные', name: 'wrong_email' });
					return Promise.reject(new Error('серверная валидация'));
				}
				return Promise.resolve(response);
			})
			.then(() => {
				dispatcher.notify(newSetMainHeaderStrongRequest());
				// надо сделать перейти на страницу откуда пришел, а не на главную
				router.go(pathsURLfrontend.root);
			})
			.catch(() => {
				dispatcher.notify(setValidationErrorLogin(result.data));
			});
	};
}

export { LoginReducer };
