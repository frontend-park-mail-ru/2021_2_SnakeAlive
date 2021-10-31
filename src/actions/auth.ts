import {
	Event,
	UserLoginData,
	ValidationErrors,
} from '../dispatcher';

const SUBMIT_LOGIN_DATA = 'SUBMIT_LOGIN_DATA';

const submitLoginData = (email: string, password: string): Event =>
	<Event>{
		key: SUBMIT_LOGIN_DATA,
		metadata: <UserLoginData>{
			email,
			password,
		},
	};

const SET_VALIDATION_ERROR_LOGIN = 'SET_VALIDATION_ERROR_LOGIN';

const setValidationErrorLogin = (data: Map<string, string>): Event =>
	<Event>{
		key: SET_VALIDATION_ERROR_LOGIN,
		metadata: <ValidationErrors>{
			data
		}
	}

export {
	SUBMIT_LOGIN_DATA,
	submitLoginData,
	SET_VALIDATION_ERROR_LOGIN,
	setValidationErrorLogin
};
