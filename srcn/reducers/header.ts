import {Storage} from "../storage/index";
import {Dispatcher, EventType, Token} from "../dispatcher/index";
import {
    destroyCountryPage,
    getCountryCardRequest,
    initCountryRequest, newSetMainHeaderBasicResponse, newSetMainHeaderLoggedResponse,
    removeHeaderRequest,
    setMainHeaderRequest
} from "../actions/index";
import {sendGetJSONRequest, HttpError} from "../http/index";
import {backendEndpoint, profile} from "../constants/index";
import {UserMetadata} from "../models/index";


export default class HeaderReducer {
    #storage: Storage;
    #dispatcher: Dispatcher;
    #tokens: Token[];

    constructor(storage: Storage, dispatcher: Dispatcher) {
        this.#storage = storage;
        this.#dispatcher = dispatcher;
        this.#tokens = [];
    }

    init = () => {
        this.#tokens = [
            this.#dispatcher.register(setMainHeaderRequest, this.setHeader),
            this.#dispatcher.register(removeHeaderRequest, this.destroy),
        ];
    }

    destroy = (metadata: EventType): void => {
        let that: HeaderReducer = this;
        this.#tokens.forEach(element => {
            that.#dispatcher.unregister(element);
        })
    }

    setHeader = (metadata: EventType): void => {
        sendGetJSONRequest(backendEndpoint + profile)
            .then(response => {
                if (response.status === 401) {
                    return Promise.reject(
                        new HttpError('пользователь не авторизован', response.status.toString()),
                    );
                }

                return response.json();
            })
            .then((data: UserMetadata) => {
                this.#storage.setUserMetadata(data);
                this.#dispatcher.notify(newSetMainHeaderLoggedResponse());
            })
            .catch(() => this.#dispatcher.notify(newSetMainHeaderBasicResponse()));
    }
}