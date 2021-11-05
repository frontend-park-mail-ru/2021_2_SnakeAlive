import { DataType, dispatcher, EventType } from '@/dispatcher';
import { newSetEmptyHeaderRequest } from '../actions';

export default class LoginReducer {
	init = () => {
		console.log("login reducer inited");
		dispatcher.register(EventType.SUBMIT_LOGIN_DATA, this.login);
		dispatcher.notify(newSetEmptyHeaderRequest());
	};

	login = (metadata: DataType) => {
		console.log(metadata);
	};
}
