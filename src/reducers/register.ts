import { dispatcher, EventType, RegisterData, ValidationErrData } from '../dispatcher';
import { newSetEmptyHeaderResponse, newSetMainHeaderStrongRequest } from '@/actions/header';
import { setValidationErrorRegister } from '@/actions/auth';
import { sendPostJSONRequest } from '@/http';
import { backendEndpoint, pathsURLfrontend, registerURI } from '@/constants';
import { router } from '@/router';

export default class RegisterReducer {
	init = () => {
		dispatcher.register(EventType.SUBMIT_REGISTER_DATA, this.register);
		dispatcher.notify(newSetEmptyHeaderResponse(false));
	};

	register = (input: RegisterData) => {
		const result: ValidationErrData = {
			data: [],
		};

		sendPostJSONRequest(backendEndpoint + registerURI, input)
			.then(response => {
				if (response.status === 400) {
					result.data.push({
						error: 'Пользователь с такой почтой уже существует',
						name: 'wrong_email',
					});
					return Promise.reject();
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
				dispatcher.notify(setValidationErrorRegister(result.data));
			});
	};
}
