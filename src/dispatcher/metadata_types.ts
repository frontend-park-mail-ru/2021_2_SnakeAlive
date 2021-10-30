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

export type EventType = Empty | ID | NamedID | ErrorMessage;
