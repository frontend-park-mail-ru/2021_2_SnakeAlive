import { DataType, dispatcher, EventType, RegisterData, ValidationErrData } from '../dispatcher';
import { newSetEmptyHeaderResponse, newSetMainHeaderStrongRequest } from '@/actions';
import { sendPostJSONRequest } from '@/http';
import { backendEndpoint, loginURI, pathsURLfrontend, registerURI } from '@/constants';
import { router } from '@/router';

export default class RegisterReducer {
	init = () => {
		dispatcher.register(EventType.SUBMIT_REGISTER_DATA, this.register);
		dispatcher.notify(newSetEmptyHeaderResponse());
	};

	register = (input: RegisterData) => {
		let result: ValidationErrData;

		sendPostJSONRequest(backendEndpoint + registerURI, input)
			.then(response => {
				if (response.status === 400) {
					result.data.push({ email: 'неверный пароль' });
					return Promise.reject();
				}
				if (response.status === 404) {
					result.data.push({ password: 'нет такого пользователя' });
					return Promise.reject();
				}
				if (response.status === 400) {
					return Promise.reject(new Error('серверная валидация. сделать другую обработку ошибок'));
				}
				return Promise.resolve(response);
			})
			.then(() => {
				dispatcher.notify(newSetMainHeaderStrongRequest());
				// надо сделать перейти на страницу откуда пришел, а не на главную
				router.go(pathsURLfrontend.profile);
			})
			.catch(() => {
				console.log('rejected');
				// dispatcher.notify(setValidationErrorLogin());
			});
	};
}
