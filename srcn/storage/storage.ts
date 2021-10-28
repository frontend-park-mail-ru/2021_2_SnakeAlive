import {Country, CountryCard, TemplateCards} from "../models/index";

export default class Storage {
    #countryCards: TemplateCards;
    #country: Country;

    constructor() {
        this.#countryCards = <TemplateCards>{};
        this.#country = <Country>{};
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
}