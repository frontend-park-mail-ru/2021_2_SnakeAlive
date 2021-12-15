import { AdoptedTag } from '@/models/tags';

export interface GotSight {
	id: string;
	name: string;
	description: string;
	country: string;
	lat: string;
	lng: string;
	rating: string;
	tags: string[];
	photos: Array<string>;
}

export interface Sight {
	id: string;
	name: string;
	description: string;
	country: string;
	lat: string;
	lng: string;
	rating: string;
	tags: Array<AdoptedTag>;
	photos: Array<string>;
}

export interface SightsCoord {
	id: number;
	lat: number;
	lng: number;
}

export interface SightDay {
	sight: Sight;
	day: number;
}

export interface TagAdoptedForRender {
	id: string;
	name: string;
	sightPP: number;
}

export interface SightAdoptedForRender {
	id: string;
	name: string;
	description: string;
	rating: string;
	tags: Array<TagAdoptedForRender>;
	photos: Array<string>;
	photo: string;
}
