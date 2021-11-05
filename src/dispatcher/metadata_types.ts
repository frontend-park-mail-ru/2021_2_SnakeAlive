export interface Empty {
}

export interface IdData {
    ID: string;
}

export interface NamedID {
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
    data: Map<string, string>;
}

export interface UserMinData {
    name: string;
    avatar: string;
}

export interface UpdateProfile {
    name: string;
    surname: string;
    email: string;
    password: string;
    description: string,
}

export interface File {
    data: FormData,
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
    | IdData
    | NamedID
    | ErrorMsgData
    | LoginData
    | RegisterData
    | ValidationErrData
    | UserMinData
    | UpdateProfile
    | File
    // | SightData
    // | TripData
    // | CountryData
    | Empty;
