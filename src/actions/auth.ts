import { Empty, IEvent, LoginData, RegisterData, ValidationErrData } from '@/dispatcher';
import { EventType } from '@/dispatcher/event_types';

const showLoginForm = (): IEvent =>
	<IEvent>{
		key: EventType.SHOW_LOGIN_FORM,
		metadata: <Empty>{},
	};

const showRegisterForm = (): IEvent =>
	<IEvent>{
		key: EventType.SHOW_REGISTER_FORM,
		metadata: <Empty>{},
	};

const submitLoginData = (email: string, password: string): IEvent =>
	<IEvent>{
		key: EventType.SUBMIT_LOGIN_DATA,
		metadata: <LoginData>{
			email,
			password,
		},
	};

const setValidationErrorLogin = (data: Record<string, string>[]): IEvent =>
	<IEvent>{
		key: EventType.SET_VALIDATION_ERROR_LOGIN,
		metadata: <ValidationErrData>{
			data,
		},
	};

const submitRegisterData = (
	name: string,
	surname: string,
	email: string,
	password: string,
	repeatedPassword: string
): IEvent =>
	<IEvent>{
		key: EventType.SUBMIT_REGISTER_DATA,
		metadata: <RegisterData>{
			name,
			surname,
			email,
			password,
			repeatedPassword,
		},
	};

const setValidationErrorRegister = (data: Record<string, string>[]): IEvent =>
	<IEvent>{
		key: EventType.SET_VALIDATION_ERROR_REGISTER,
		metadata: <ValidationErrData>{
			data,
		},
	};

export {
	submitLoginData,
	setValidationErrorLogin,
	submitRegisterData,
	setValidationErrorRegister,
	showRegisterForm,
	showLoginForm,
};
