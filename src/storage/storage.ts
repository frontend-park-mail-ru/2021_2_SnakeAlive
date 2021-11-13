import { Country, CountryCard, Sight, TemplateCards, Trip, UserMetadata } from '@/models';
import { Profile, ProfileMetadata } from '@/models/profile';
import { Review } from '@/models/review';
import { minCardInfo } from '@/models/country';

class Storage {
	#countryCards: TemplateCards;

	#country: Country;

	#userMetadata: UserMetadata;

	#sight: Sight;

	#serverTripState: Trip;

	#currentTripEditState: Trip;

	#addedSights: number[];

	#profile: Profile;

	#reviews: Review[];

	#lastTrips: number[];

	#cards: minCardInfo[];

	constructor() {
		this.#countryCards = <TemplateCards>{};
		this.#country = <Country>{};
		this.#userMetadata = <UserMetadata>{};
		this.#sight = <Sight>{};
		// this.#trip = <Trip>{};
		this.#serverTripState = <Trip>{};
		this.#currentTripEditState = <Trip>{};
		this.#addedSights = [];
		this.#profile = <Profile>{};
		this.#reviews = [];
		this.#lastTrips = [];
		this.#cards = [];
	}

	addLastTripId = (id: number) => {
		this.#lastTrips.forEach(elem => {
			if (elem !== id) {
				this.#lastTrips.push(id);
			}
		});
	};

	getLastTrips = () => this.#lastTrips;

	dropLastTrips = () => {
		this.#lastTrips = [];
	};

	storeCountryCards = (cards: TemplateCards): void => {
		this.#countryCards = cards;
	};

	storeCountryCardsMin = (cards: minCardInfo[]): void => {
		this.#cards = cards;
	};

	getCountryCardsMin = (): minCardInfo[] => this.#cards;

	getCountryCards = (): TemplateCards => this.#countryCards;

	storeCountry = (country: Country): void => {
		console.log(country);
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

	storeCurrentTrip = (trip: Trip): void => {
		this.#currentTripEditState = trip;
	};

	getCurrentTrip = (): Trip => this.#currentTripEditState;

	storeProfile = (profile: Profile): void => {
		this.#profile = profile;
	};

	getProfile = (): Profile => this.#profile;

	storeProfileMetadata = (metadata: ProfileMetadata): void => {
		this.#profile.meta = metadata;
	};

	storeReviews = (reviews: Review[]): void => {
		this.#reviews = reviews;
	};

	getReviews = (): Review[] => this.#reviews;

	appendReview = (review: Review): number => {
		this.#reviews.push(review);
		return this.#reviews.length;
	};

	getReview = (position: number): Review | null => {
		if (this.#reviews.length < position) {
			return null;
		}

		return this.#reviews[position];
	};
}

export const storage = new Storage();
