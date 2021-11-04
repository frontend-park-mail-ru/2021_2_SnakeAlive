import { Country, CountryCard, Sight, TemplateCards, Trip, UserMetadata } from '@/models';

class Storage {
	#countryCards: TemplateCards;

	#country: Country;

	#userMetadata: UserMetadata;

	#sight: Sight;

	#trip: Trip;

	constructor() {
		this.#countryCards = <TemplateCards>{};
		this.#country = <Country>{};
		this.#userMetadata = <UserMetadata>{};
		this.#sight = <Sight>{};
		this.#trip = <Trip>{};
	}

	storeCountryCards = (cards: TemplateCards): void => {
		this.#countryCards = cards;
	};

	getCountryCards = (): TemplateCards => this.#countryCards;

	storeCountry = (country: Country): void => {
		this.#country = country;
	};

	getCountry = (): Country => this.#country;

	setUserMetadata = (user: UserMetadata): void => {
		this.#userMetadata = user;
	};

	getUserMetadata(): UserMetadata {
		return this.#userMetadata;
	}

	storeSight = (sight: Sight): void => {
		this.#sight = sight;
	};

	getSight = (): Sight => this.#sight;

	storeTrip = (trip: Trip): void => {
		this.#trip = trip;
	};

	getTrip = (): Trip => this.#trip;
}

export const storage = new Storage();
