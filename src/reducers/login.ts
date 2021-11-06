import { DataType, dispatcher, EventType, LoginData, ValidationErrData } from '@/dispatcher';
import { newSetEmptyHeaderRequest, newSetMainHeaderStrongRequest, setValidationErrorLogin } from '../actions';
import { sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import { backendEndpoint, countrySights, loginURI, pathsURLfrontend, sightURI } from '@/constants';
import { router } from '@/router';

export default class LoginReducer {
	init = () => {
		console.log('login reducer inited');
		dispatcher.register(EventType.SUBMIT_LOGIN_DATA, this.login);
		dispatcher.notify(newSetEmptyHeaderRequest());
	};

	login = (input: LoginData) => {
		let result: ValidationErrData;

		sendPostJSONRequest(backendEndpoint + loginURI, input)
			.then(response => {
			if (response.status === 400) {
				result.data.push({'email': 'неверный пароль'});
				return Promise.reject();
			}
			if (response.status === 404) {
				result.data.push({'password': 'нет такого пользователя'});
				return Promise.reject();
			}
			if (response.status === 400) {
				return Promise.reject(new Error('серверная валидация. сделать другую обработку ошибок'));
			}
			return Promise.resolve(response);
		}).catch(() =>
			dispatcher.notify(setValidationErrorLogin(result.data))
		).then(() => {

			dispatcher.notify(newSetMainHeaderStrongRequest());
			router.popstate();
		});
	};
}

export { LoginReducer };
