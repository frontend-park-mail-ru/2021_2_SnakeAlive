import {EventType} from "./metadata_types";
import {Event} from "./event";

interface Callback {
    (metadata: EventType): void
}

export interface Token {
    place: number;
    name: string;
}

class Dispatcher {
    #subscribers: Map<string, Callback[]>;

    constructor() {
        this.#subscribers = new Map<string, Callback[]>();
    }

    register = (eventName: string, callback: Callback): Token => {
        let subs = this.#subscribers.get(eventName)
        if (subs === undefined) {
            subs = [];
        }

        subs.push(callback);
        this.#subscribers.set(eventName, subs);

        return <Token>{
            place: subs.length,
            name: eventName
        }
    }

    unregister = (token: Token): void => {
        const subs = this.#subscribers.get(token.name);
        if (subs === undefined) {
            return;
        }
        if (subs.length < token.place) {
            return;
        }

        this.#subscribers.set(token.name, subs.splice(token.place, 1))
    }

    notify = (event: Event): void => {
        const subs = this.#subscribers.get(event.key);
        if (subs === undefined) {
            return;
        }

        subs.forEach((sub) => {
            sub(event.metadata)
        });
    }
}

export const dispatcher = new Dispatcher();