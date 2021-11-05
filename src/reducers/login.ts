import { DataType, dispatcher, EventType, LoginData, ValidationErrData } from '@/dispatcher';
import { newSetEmptyHeaderRequest } from '../actions';
import { sendGetJSONRequest, sendPostJSONRequest } from '@/http';
import { backendEndpoint, countrySights, loginURI, sightURI } from '@/constants';
import { router } from '@/router';

export default class LoginReducer {
	init = () => {
		console.log('login reducer inited');
		dispatcher.register(EventType.SUBMIT_LOGIN_DATA, this.login);
		dispatcher.notify(newSetEmptyHeaderRequest());
	};

	login = (input: LoginData) => {
		// let result: Record<string, string>;
		let result: ValidationErrData;
		sendPostJSONRequest(backendEndpoint + loginURI, input).then(response => {
			if (response.status === 400) {
				result.data.set('email', 'неверный пароль');
			}
			if (response.status === 404) {
				result.data.set('password', 'нет такого пользователя');
			}
			if (response.status === 400) {
				return Promise.reject(new Error('серверная валидация. сделать другую обработку ошибок'));
			}
			return Promise.resolve(response);
		});
	};
}

export { LoginReducer };
