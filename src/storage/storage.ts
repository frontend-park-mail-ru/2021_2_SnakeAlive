import { Country, CountryCard, Sight, TemplateCards, Trip, UserMetadata } from '@/models';
import { Profile, ProfileMetadata } from '@/models/profile';
import { Review } from '@/models/review';
import { minCardInfo } from '@/models/country';
import { Album } from '@/models/album';

class Storage {
	#countryCards: TemplateCards;

	#country: Country;

	#userMetadata: UserMetadata;

	#sight: Sight;

	#trip: Trip;

	#profile: Profile;

	#reviews: Review[];

	#lastTrips: number[];

	#cards: minCardInfo[];

	#album: Album;

	constructor() {
		this.#countryCards = <TemplateCards>{};
		this.#country = <Country>{};
		this.#userMetadata = <UserMetadata>{};
		this.#sight = <Sight>{};
		this.#trip = <Trip>{};
		this.#profile = <Profile>{};
		this.#reviews = [];
		this.#lastTrips = [];
		this.#cards = [];
		this.#album = <Album>{};
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
		this.#trip = trip;
	};

	getCurrentTrip = (): Trip => this.#trip;

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

	storeAlbum = (album: Album): void => {
		this.#album = album;
	};

	getAlbum = (): Album => this.#album;
}

export const storage = new Storage();
