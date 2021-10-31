import { Event, UserLoginData, UserRegisterData, ValidationErrors } from '../dispatcher';

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
			data,
		},
	};

const SUBMIT_REGISTER_DATA = 'SUBMIT_LOGIN_DATA';

const submitRegisterData = (
	name: string,
	surname: string,
	email: string,
	password: string,
	repeatedPassword: string
): Event =>
	<Event>{
		key: SUBMIT_REGISTER_DATA,
		metadata: <UserRegisterData>{
			name,
			surname,
			email,
			password,
			repeatedPassword,
		},
	};

const SET_VALIDATION_ERROR_REGISTER = 'SET_VALIDATION_ERROR_LOGIN';

const setValidationErrorRegister = (data: Map<string, string>): Event =>
	<Event>{
		key: SET_VALIDATION_ERROR_REGISTER,
		metadata: <ValidationErrors>{
			data,
		},
	};

export {
	SUBMIT_LOGIN_DATA,
	submitLoginData,
	SET_VALIDATION_ERROR_LOGIN,
	setValidationErrorLogin,
	SUBMIT_REGISTER_DATA,
	submitRegisterData,
	SET_VALIDATION_ERROR_REGISTER,
	setValidationErrorRegister,
};
