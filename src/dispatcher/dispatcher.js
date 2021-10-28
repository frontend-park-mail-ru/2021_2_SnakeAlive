import Event from "./event.js"

export default class Dispatcher {
    #subscribers;

    constructor() {
        this.#subscribers = new Map();
    };

    register(eventName = '', callback) {
        let subs = this.#subscribers.get(eventName)
        if (subs === undefined) {
            subs = [];
        }

        subs.push(callback);
        this.#subscribers.set(eventName, subs);

        return {
            place: subs.length,
            eventName,
        };
    };

    unregister(metadata = {
        place: 0,
        eventName: "",
    }) {
        let subs = this.#subscribers.get(metadata.eventName);
        if (subs === undefined) {
            return;
        }
        if (subs.length < metadata.place) {
            return;
        }

        this.#subscribers.set(metadata.eventName, subs.splice(metadata.place, 1));
    }

    notify(event = {
        key: "",
        metadata: {},
    }) {
        let subs = this.#subscribers.get(event.key);
        if (subs === undefined) {
            return;
        }

        subs.forEach((elem) => {
            elem(event.metadata);
        });
    };
}