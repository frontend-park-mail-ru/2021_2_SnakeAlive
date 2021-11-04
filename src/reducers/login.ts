import { DataType, dispatcher, EventType } from '@/dispatcher';
import { newSetEmptyHeaderResponse } from '../actions';

export default class LoginReducer {
	init = () => {
		dispatcher.register(EventType.SUBMIT_LOGIN_DATA, this.login);
		dispatcher.notify(newSetEmptyHeaderResponse());
	};

	login = (metadata: DataType) => {
		console.log(metadata);
	};
}
