interface Country {
	name: string;
	ID: string;
}

interface CountryResponse {
	name: string;
	id: number;
	description: string;
	photo: string;
}

interface CountryCardResponse {
	id: number;
	name: string;
	tags: string[];
	photos: string[];
	// eslint-disable-next-line camelcase
	user_id: string;
	review: string;
}

interface CountryCardTag {
	name: string;
}

interface CountryCardPhoto {
	source: string;
}

interface CountryCard {
	name: string;
	author: string;
	comment: string;
	tags: CountryCardTag[];
	imgs: CountryCardPhoto[];
}

interface TemplateCards {
	cards: CountryCard[];
}

export interface minCardInfo {
	sight: {
		id: string;
		name: string;
		rating: number;
		tag: string[];
	};
	PP: number;
}

export {
	Country,
	CountryCard,
	CountryCardResponse,
	TemplateCards,
	CountryCardPhoto,
	CountryCardTag,
	CountryResponse,
};
