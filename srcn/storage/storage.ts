import {Country, CountryCard, TemplateCards, UserMetadata} from "../models/index";

export default class Storage {
    #countryCards: TemplateCards;
    #country: Country;
    #userMetadata: UserMetadata;

    constructor() {
        this.#countryCards = <TemplateCards>{};
        this.#country = <Country>{};
        this.#userMetadata = <UserMetadata>{};
    }

    storeCountryCards = (cards: TemplateCards): void => {
        this.#countryCards = cards;
    }

    getCountryCards = (): TemplateCards => {
        return this.#countryCards;
    }

    storeCountry = (country: Country): void => {
        this.#country = country;
    }

    getCountry = (): Country => {
        return this.#country;
    }

    setUserMetadata = (user: UserMetadata): void => {
        this.#userMetadata = user;
    }

    getUserMetadata(): UserMetadata {
        return this.#userMetadata;
    }
}