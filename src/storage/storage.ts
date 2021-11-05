import {Country, CountryCard, Sight, TemplateCards, Trip, UserMetadata} from '@/models';
import {Profile, ProfileMetadata} from "@/models/profile";
import {Review} from "@/models/review";

class Storage {
    #countryCards: TemplateCards;

    #country: Country;

    #userMetadata: UserMetadata;

    #sight: Sight;

    #trip: Trip;

    #profile: Profile;

    #reviews: Review[];

    constructor() {
        this.#countryCards = <TemplateCards>{};
        this.#country = <Country>{};
        this.#userMetadata = <UserMetadata>{};
        this.#sight = <Sight>{};
        this.#trip = <Trip>{};
        this.#profile = <Profile>{};
        this.#reviews = [];
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

    storeProfile = (profile: Profile): void => {
        this.#profile = profile;
    }

    getProfile = (): Profile => this.#profile;

    storeProfileMetadata = (metadata: ProfileMetadata): void => {
        this.#profile.meta = metadata;
    }

    storeReviews = (reviews: Review[]): void => {
        this.#reviews = reviews
    }

    getReviews = (): Review[] => this.#reviews

    appendReview = (review: Review): number => {
        this.#reviews.push(review);
        return this.#reviews.length;
    }

    getReview = (position: number): Review | null => {
        if (this.#reviews.length < position) {
            return null
        }

        return this.#reviews[position];
    }
}


export const storage = new Storage();
