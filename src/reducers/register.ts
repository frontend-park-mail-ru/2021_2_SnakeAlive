import { dispatcher, EventType } from '../dispatcher';
import { newSetEmptyHeaderResponse, SUBMIT_REGISTER_DATA } from '../actions';

export default class RegisterReducer {
	init = () => {
		dispatcher.register(SUBMIT_REGISTER_DATA, this.register);
		dispatcher.notify(newSetEmptyHeaderResponse());
	};

	register = (metadata: EventType) => {
		console.log(metadata);
	};
}
