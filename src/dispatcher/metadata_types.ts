import { TripFormInfo } from '@/models/trip';

export interface Empty {}

export interface NumID {
	ID: number;
}

export interface UUID {
	ID: string;
}

export interface Search {
	type: string;
	text: string;
}

export interface IDState {
	ID: string;
	state: boolean;
}

export interface NamedUUID {
	ID: string;
	name: string;
}

export interface ErrorMsgData {
	error: Error;
}

export interface LoginData {
	email: string;
	password: string;
}

export interface RegisterData {
	name: string;
	surname: string;
	email: string;
	password: string;
	repeatedPassword: string;
}

export interface ValidationErrData {
	data: Record<string, string>[];
}

export interface UserMinData {
	name: string;
	avatar: string;
}

export interface UpdateProfile {
	name: string;
	surname: string;
	//	email: string;
	password: string;
	description: string;
}

export interface File {
	data: FormData;
}

export interface CreateReview {
	title: string;
	text: string;
	rating: number;
	placeId: number;
}

export interface CreateReviewForm {
	title: string;
	text: string;
	rating: number;
}

export interface SubmitTripInfo {
	info: TripFormInfo;
}

export interface TripInfo {
	title: string;
	description: string;
}

export interface SightToTrip {
	sightId: number;
	day: number;
}

export interface IsTrue {
	isTrue: boolean;
}
export interface AlbumInfo {
	title: string;
	description: string;
}

export type DataType =
	| UUID
	| NumID
	| NamedUUID
	| ErrorMsgData
	| LoginData
	| RegisterData
	| ValidationErrData
	| UserMinData
	| UpdateProfile
	| File
	| CreateReview
	| CreateReviewForm
	| SightToTrip
	| IsTrue
	| IDState
	| SubmitTripInfo
	| Empty
	| AlbumInfo
	| Search;
