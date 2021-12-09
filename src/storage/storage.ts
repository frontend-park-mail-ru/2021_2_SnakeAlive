import { Country, Sight, TemplateCards, Trip, UserMetadata } from '@/models';
import { Profile, ProfileAlbum, ProfileMetadata, ProfileTrip } from '@/models/profile';
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

	#albumTripId = '';

	#shareTripLink = '';

	#addTripUserLink = '';

	#searchSightsResult: {
		type: string;
		sights: Sight[];
	}[];

	#profileTrips: ProfileTrip[];

	#profileAlbums: ProfileAlbum[];

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
		this.#searchSightsResult = [];
		this.#profileTrips = <ProfileTrip[]>{};
		this.#profileAlbums = <ProfileAlbum[]>{};
	}

	addLastTripId = (id: number) => {
		this.#lastTrips.forEach(elem => {
			if (elem !== id) {
				this.#lastTrips.push(id);
			}
		});
	};

	storeSightsCardsMin = (cards: minCardInfo[]): void => {
		this.#cards = cards;
	};

	getSightsCardsMin = (): minCardInfo[] => this.#cards;

	storeCountry = (country: Country): void => {
		this.#country = country;
	};

	getCountry = (): Country => this.#country;

	storeSight = (sight: Sight): void => {
		this.#sight = sight;
	};

	getSight = (): Sight => this.#sight;

	storeCurrentTrip = (trip: Trip): void => {
		this.#trip = trip;
	};

	clearCurrentTrip = (): void => {
		this.#trip = <Trip>{};
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

	storeAlbumTripId = (id: string) => {
		this.#albumTripId = id;
	};

	getAlbumTripId = (): string => this.#albumTripId;

	storeSearchSightsResult = (type: string, sights: Sight[]): void => {
		this.#searchSightsResult.push({
			type,
			sights,
		});
	};

	getSearchSightsResult = (type: string): Sight[] => {
		let result: Sight[] = [];
		// eslint-disable-next-line consistent-return
		this.#searchSightsResult.forEach(obj => {
			if (obj.type === type) {
				result = obj.sights;
			}
		});
		return result;
	};

	storeProfileTrips = (trips: ProfileTrip[]) => {
		this.#profileTrips = trips;
	};

	getProfileTrips = (): ProfileTrip[] => this.#profileTrips;

	storeProfileAlbums = (albums: ProfileAlbum[]) => {
		this.#profileAlbums = albums;
	};

	getProfileAlbums = (): ProfileAlbum[] => this.#profileAlbums;

	setShareTripLink = (link: string) => {
		this.#shareTripLink = link;
	};

	getShareTripLink = (): string => this.#shareTripLink;

	setAddTripUserLink = (link: string) => {
		this.#addTripUserLink = link;
	};

	getAddTripUserLink = (): string => this.#addTripUserLink;
}

export const storage = new Storage();
