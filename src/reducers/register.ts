import { DataType, dispatcher, EventType, RegisterData, ValidationErrData } from '../dispatcher';
import { newSetEmptyHeaderResponse, newSetMainHeaderStrongRequest, setValidationErrorRegister } from '@/actions';
import { sendPostJSONRequest } from '@/http';
import { backendEndpoint, loginURI, pathsURLfrontend, registerURI } from '@/constants';
import { router } from '@/router';

export default class RegisterReducer {
	init = () => {
		dispatcher.register(EventType.SUBMIT_REGISTER_DATA, this.register);
		dispatcher.notify(newSetEmptyHeaderResponse(false));
	};

	register = (input: RegisterData) => {
		let result: ValidationErrData = {
			data: [],
		};

		sendPostJSONRequest(backendEndpoint + registerURI, input)
			.then(response => {
				if (response.status === 400) {
					result.data.push({ error: 'Пользователь с такой почтой уже существует', name: 'wrong_email'  });
					return Promise.reject();
				}
				return Promise.resolve(response);
			})
			.then(() => {
				// dispatcher.notify(newSetMainHeaderStrongRequest());
				// надо сделать перейти на страницу откуда пришел, а не на главную
				router.go(pathsURLfrontend.profile);
			})
			.catch(() => {
				console.log('rejected');
				dispatcher.notify(setValidationErrorRegister(result.data));
			});
	};
}
