import { IEvent } from './event';
import { EventType } from '@/dispatcher/event_types';

interface Callback {
	(metadata: any): void;
}

export interface Token {
	place: number;
	name: EventType;
}

class Dispatcher {
	#subscribers: Map<EventType, Callback[]>;

	constructor() {
		this.#subscribers = new Map<EventType, Callback[]>();
	}

	register = (eventName: EventType, callback: Callback): Token => {
		let subs = this.#subscribers.get(eventName);
		if (subs === undefined) {
			subs = [];
		}

		subs.push(callback);
		this.#subscribers.set(eventName, subs);

		return <Token>{
			place: subs.length,
			name: eventName,
		};
	};

	unregister = (token: Token): void => {
		const subs = this.#subscribers.get(token.name);
		if (subs === undefined) {
			return;
		}
		if (subs.length < token.place) {
			return;
		}

		this.#subscribers.set(token.name, subs.splice(token.place, 1));
	};

	notify = (event: IEvent, place?: any): void => {
		// console.log(event, place);

		const subs = this.#subscribers.get(event.key);
		if (subs === undefined) {
			return;
		}

		subs.forEach(sub => {
			sub(event.metadata);
		});
	};
}

export const dispatcher = new Dispatcher();
