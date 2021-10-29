import BasicView from "./view";
import {storage} from "../storage";
import {dispatcher, EventType, Token} from "../dispatcher";
import {UserMetadata} from "../models";

// @ts-ignore
import '../precompiled/templates';
import {removeHeaderRequest, setMainHeaderBasicResponse, setMainHeaderLoggedResponse} from "../actions";

export default class HeaderView extends BasicView {
    #tokens: Token[];

    constructor() {
        super('header');

        this.#tokens = [];
    }

    init = (): void => {
        this.#tokens = [
            dispatcher.register(removeHeaderRequest, this.destroy),
            dispatcher.register(setMainHeaderLoggedResponse, this.setMainHeaderLogged),
            dispatcher.register(setMainHeaderBasicResponse, this.setMainHeaderBasic),
        ]
    }

    destroy = (metadata: EventType): void => {
        const that: HeaderView = this;
        this.#tokens.forEach(element => {
            dispatcher.unregister(element);
        })

        this.setEmpty();
    }

    setMainHeaderLogged = (metadata: EventType): void => {
        const user: UserMetadata = storage.getUserMetadata();

        this.setView(Handlebars.templates.header_content(user));
        // TODO: add buttons!
    }

    setMainHeaderBasic = (metadata: EventType): void => {
        this.setView(Handlebars.templates.header_content(''));
        // TODO: add buttons!
    }
}
