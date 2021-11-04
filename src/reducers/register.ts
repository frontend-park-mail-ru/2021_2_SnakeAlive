import { DataType, dispatcher, EventType } from '../dispatcher';
import { newSetEmptyHeaderResponse } from '@/actions';

export default class RegisterReducer {
	init = () => {
		dispatcher.register(EventType.SUBMIT_REGISTER_DATA, this.register);
		dispatcher.notify(newSetEmptyHeaderResponse());
	};

	register = (metadata: DataType) => {
		console.log(metadata);
	};
}
