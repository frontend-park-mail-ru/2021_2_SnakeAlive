import BasicView from "./view";
import {
    getCountryCardsError, getCountryCardsResult,
    newGetCountryCardsRequest,

    destroyInnerRequest, destroyCountryPage,
    newDestroyCountryPage,
} from "../actions/index";
import {Storage} from "../storage/index";
import {Dispatcher, ErrorMessage, EventType, Token} from "../dispatcher/index";

// @ts-ignore
import * as Handlebars from 'handlebars/runtime';
import '../precompiled/templates';


class CountryCardsHolderView extends BasicView {
    #storage: Storage;
    #dispatcher: Dispatcher;
    #tokens: Token[];

    constructor(storage: Storage, dispatcher: Dispatcher) {
        super('.card__grid');

        this.#storage = storage;
        this.#dispatcher = dispatcher;
        this.#tokens = [];
    }

    init() {
        this.#tokens = [
            this.#dispatcher.register(getCountryCardsResult, this.renderCountryCards),
            this.#dispatcher.register(getCountryCardsError, this.renderErrorMessage),
            this.#dispatcher.register(destroyCountryPage, this.destroy)
        ];
    };

    destroy = (metadata: EventType = {}): void => {
        let that: CountryCardsHolderView = this;
        this.#tokens.forEach(element => {
            that.#dispatcher.unregister(element);
        })

        this.setEmpty();
    };

    renderCountryCards = (metadata: EventType = {}): void => {
        const {sights} = Handlebars.templates;
        this.setView(sights(this.#storage.getCountryCards()))
    };

    renderErrorMessage = (metadata: EventType = {}): void => {
        let event = <ErrorMessage>metadata
        this.setView(`<p>${event.error}</p>`);
    };
}

class CountryHolderView extends BasicView {
    #storage: Storage;
    #dispatcher: Dispatcher;
    #tokens: Token[];

    constructor(storage: Storage, dispatcher: Dispatcher) {
        super('#inner');

        this.#storage = storage;
        this.#dispatcher = dispatcher;
        this.#tokens = [];
    }

    init() {
        this.#tokens = [
            this.#dispatcher.register(getCountryCardsResult, this.renderCountry),
            this.#dispatcher.register(destroyInnerRequest, this.destroy),
        ];
    }

    destroy = (metadata: EventType = {}): void => {
        let that: CountryHolderView = this;
        this.#tokens.forEach(element => {
            that.#dispatcher.unregister(element);
        })

        this.#dispatcher.notify(newDestroyCountryPage());

        this.setEmpty();
    }

    renderCountry = (metadata: EventType = {}): void => {
        const countryPageTemplate = Handlebars.templates.country_sights;
        const {name, ID} = this.#storage.getCountry();
        this.setView(countryPageTemplate({name}))

        this.#dispatcher.notify(newGetCountryCardsRequest(ID));
    }
}

export {CountryHolderView, CountryCardsHolderView};