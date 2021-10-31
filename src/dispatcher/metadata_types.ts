import { UserMetadata } from '@/models';

export interface Empty {}

export interface ID {
	ID: any;
}

export interface NamedID {
	ID: any;
	name: string;
}

export interface ErrorMessage {
	error: Error;
}

export interface UserLoginData {
	email: string;
	password: string;
}

export interface UserRegisterData {
	name: string;
	surname: string;
	email: string;
	password: string;
	repeatedPassword: string;
}

export interface ValidationErrors {
	data:  Map<string, string>
}

export interface UserCommonData {
	user: UserMetadata;
}

export type EventType =
	| Empty
	| ID
	| NamedID
	| ErrorMessage
	| UserLoginData
	| UserRegisterData
	| UserCommonData
	| ValidationErrors;
