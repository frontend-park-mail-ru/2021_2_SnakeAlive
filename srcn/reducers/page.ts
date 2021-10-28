import CountryReducer from "./country";
import {initPageRequest, newInitCountryRequest} from "../actions/index";
import {CountryCardsHolderView, CountryHolderView} from "../view/index";
import {Storage} from "../storage";
import {Dispatcher} from "../dispatcher";

export default class PageReducer {
    #storage: Storage;
    #dispatcher: Dispatcher;

    constructor(storage: Storage, dispatcher: Dispatcher) {
        this.#dispatcher = dispatcher
        this.#storage = storage;
    }

    init = () => {
        this.#dispatcher.register(initPageRequest, this.createInitPage)
    }

    createInitPage = (): void => {
        console.log(this)
        let countryReducer: CountryReducer = new CountryReducer(this.#storage, this.#dispatcher);
        countryReducer.init();

        let countryHolderView: CountryHolderView = new CountryHolderView(this.#storage, this.#dispatcher);
        countryHolderView.init();

        let countryCardsHolderView: CountryCardsHolderView = new CountryCardsHolderView(this.#storage, this.#dispatcher);
        countryCardsHolderView.init();
    };
}