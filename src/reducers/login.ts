import { dispatcher, EventType } from '../dispatcher';
import { newSetEmptyHeaderResponse, newSetMainHeaderRequest, SUBMIT_LOGIN_DATA } from '../actions';

export default class LoginReducer {
	init = () => {
		dispatcher.register(SUBMIT_LOGIN_DATA, this.login);
		dispatcher.notify(newSetEmptyHeaderResponse());
	};

	login = (metadata: EventType) => {
		console.log(metadata);
	};
}
