import { TripFormInfo } from '@/models/trip';

export interface Empty {}

export interface NumID {
	ID: number;
}

export interface UUID {
	ID: string;
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

export interface sightToTrip {
	sightId: number;
	day: number;
}

export interface isTripEdited {
	isEdit: boolean;
}

// export interface SightData {
// 	id: string,
// 	name: string,
// 	description: string,
// 	country: string,
// 	rating: string,
// 	tags: Array<string>
// }
//
// export interface TripData {
// 	id: string,
// 	title: string,
// 	description: string,
// 	days: Array<Array<SightData>>,
// }
//
// export interface CountryData {
// 	name: string,
// 	description: string,
// 	sights: Array<SightData>,
// }

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
	| sightToTrip
	| isTripEdited
	// | SightData
	// | TripData
	// | CountryData
	| SubmitTripInfo
	| Empty;
