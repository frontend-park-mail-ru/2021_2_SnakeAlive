import {sendGetJSONRequest} from "../http/index";
import {backendEndpoint, countrySights} from "../constants";
import {
    destroyCountryPage,
    getCountryCardRequest,
    initCountryRequest,
    newGetCountryCardsError,
    newGetCountryCardsResult,
    newInitCountryResponse
} from "../actions/index";
import {adaptGetCards} from "../adapters/index";
import {Storage} from "../storage/index";
import {Dispatcher, EventType, NamedID, ID, Token} from "../dispatcher/index";
import {Country, CountryCard, CountryCardResponse} from "../models/index";

export default class CountryReducer {
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
            this.#dispatcher.register(initCountryRequest, this.initCountryPage),
            this.#dispatcher.register(getCountryCardRequest, this.getCountryCards),
            this.#dispatcher.register(destroyCountryPage, this.destroy),
        ];
    }

    destroy = (metadata: EventType): void => {
        this.#tokens.forEach(tkn => {
            this.#dispatcher.unregister(tkn);
        })
    }

    initCountryPage = (metadata: EventType): void => {
        let country = <NamedID>metadata;
        this.#storage.storeCountry(<Country>{
            name: country.name,
            ID: <string>country.ID,
        })

        this.#dispatcher.notify(newInitCountryResponse(country.name, <string>country.ID));
    }

    getCountryCards = (metadata: EventType): void => {
        const data = <ID>metadata;
        this.#getCards(<string>data.ID)
            .then((cards: CountryCardResponse[]) => {
                this.#storage.storeCountryCards(adaptGetCards(cards));
                this.#dispatcher.notify(newGetCountryCardsResult());
            })
            .catch((error: Error) => {
                this.#dispatcher.notify(newGetCountryCardsError(error));
            })
    }

    #getCards = (countryID: string): Promise<CountryCardResponse[]> => {
        return sendGetJSONRequest(backendEndpoint + countrySights + countryID).then(response => {
            if (response.status === 404) {
                return Promise.reject(new Error('На сайте нет такой страницы'));
            }
            if (response.status === 401) {
                return Promise.reject(new Error('Нужно войти в систему'));
            }
            return Promise.resolve(response);
        }).then(response => response.json())
    }
}
