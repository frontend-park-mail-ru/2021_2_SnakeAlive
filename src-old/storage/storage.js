class Storage {
	#countryCards = [];

	#country = {};

	constructor() {
		this.#countryCards = [];
		this.#country = {};
	}

	storeCountryCards(cards = []) {
		this.#countryCards = cards;
	}

	getCountryCards() {
		return this.#countryCards;
	}

	storeCountry(country = {}) {
		this.#country = country;
	}

	getCountry() {
		return this.#country;
	}
}

export const storage = new Storage(); //
