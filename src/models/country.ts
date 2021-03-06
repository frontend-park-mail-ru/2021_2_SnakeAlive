import { TagAdoptedForRender } from '@/models/sight';
import { AdoptedTag } from '@/models/tags';

interface Country {
	name: string;
	id: string;
	translation: string;
}

interface CountryResponse {
	name: string;
	id: number;
	description: string;
	photo: string;
	translated: string;
}

interface CountryCardResponse {
	descripton: string;
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
	description: string;
}

interface TemplateCards {
	cards: CountryCard[];
}

export interface minCardInfo {
	sight: {
		id: string;
		name: string;
		rating: number;
		tags: AdoptedTag[];
		adoptedTags: TagAdoptedForRender[];
		photo: string;
	};
	PP: number;
}

export interface SearchCountry {
	name: string;
	id: string;
	translation: string;
	numId?: number;
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
