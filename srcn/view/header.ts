import BasicView from "./view";
import {Storage} from "../storage";
import {Dispatcher, EventType, Token} from "../dispatcher";
import {UserMetadata} from "../models";

// @ts-ignore
import * as Handlebars from 'handlebars/runtime';
import '../precompiled/templates';
import {removeHeaderRequest, setMainHeaderBasicResponse, setMainHeaderLoggedResponse} from "../actions";

export default class HeaderView extends BasicView {
    #storage: Storage;
    #dispatcher: Dispatcher;
    #tokens: Token[];

    constructor(storage: Storage, dispatcher: Dispatcher) {
        super('header');

        this.#storage = storage;
        this.#dispatcher = dispatcher
        this.#tokens = [];
    }

    init = (): void => {
        this.#tokens = [
            this.#dispatcher.register(removeHeaderRequest, this.destroy),
            this.#dispatcher.register(setMainHeaderLoggedResponse, this.setMainHeaderLogged),
            this.#dispatcher.register(setMainHeaderBasicResponse, this.setMainHeaderBasic),
        ]
    }

    destroy = (metadata: EventType): void => {
        let that: HeaderView = this;
        this.#tokens.forEach(element => {
            that.#dispatcher.unregister(element);
        })

        this.setEmpty();
    }

    setMainHeaderLogged = (metadata: EventType): void => {
        let user: UserMetadata = this.#storage.getUserMetadata();

        this.setView(Handlebars.templates.header_content(user));
        // TODO: add buttons!
    }

    setMainHeaderBasic = (metadata: EventType): void => {
        this.setView(Handlebars.templates.header_content(''));
        // TODO: add buttons!
    }
}
