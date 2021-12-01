import { Trip } from '@/models/trip';

export interface Sight {
	id: string;
	name: string;
	description: string;
	country: string;
	lat: string;
	lng: string;
	rating: string;
	tags: Array<string>;
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
	// isUser: boolean;
	// trips?: Trip[];
}
