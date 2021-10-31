import { dispatcher, EventType } from '../dispatcher';
import { SUBMIT_LOGIN_DATA } from '../actions';

export default class LoginReducer {
	init = () => {
		dispatcher.register(SUBMIT_LOGIN_DATA, this.login);
	};

	login = (metadata: EventType) => {
		console.log(metadata);
	};
}
