import { DataType, dispatcher, EventType, LoginData, ValidationErrData } from '@/dispatcher';
import { newSetEmptyHeaderRequest, newSetMainHeaderStrongRequest } from '@/actions/header';
import { setValidationErrorLogin } from '@/actions/auth';
import { sendPostJSONRequest } from '@/http';
import { backendEndpoint, loginURI, pathsURLfrontend } from '@/constants';
import { router } from '@/router';

export default class LoginReducer {
	init = () => {
		console.log('login reducer inited');
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
					result.data.push({ error: 'Пользователь не найден', name: 'no_user' });
					return Promise.reject();
				}
				if (response.status === 400) {
					result.data.push({ error: 'Некорректные данные', name: 'no_user' });
					return Promise.reject(new Error('серверная валидация. сделать другую обработку ошибок'));
				}
				return Promise.resolve(response);
			})
			.then(() => {
				dispatcher.notify(newSetMainHeaderStrongRequest());
				// надо сделать перейти на страницу откуда пришел, а не на главную
				router.go(pathsURLfrontend.root);
			})
			.catch(() => {
				console.log('rejected');
				dispatcher.notify(setValidationErrorLogin(result.data));
			});
	};
}

export { LoginReducer };
