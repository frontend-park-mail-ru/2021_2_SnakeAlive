import { Empty, ErrorMsgData, IdData, IEvent, NamedID } from '@/dispatcher';
import { EventType } from '@/dispatcher/event_types';

// const initCountryRequest = 'INIT_COUNTRY_REQUEST';
//
// const newInitCountryRequest = (name: string, id: string): IEvent =>
// 	<IEvent>{
// 		key: initCountryRequest,
// 		metadata: <NamedID>{
// 			name,
// 			ID: id,
// 		},
// 	};
//
// const initCountryResponse = 'INIT_COUNTRY_RESPONSE';
//
// const newInitCountryResponse = (name: string, id: string): IEvent =>
// 	<IEvent>{
// 		key: initCountryResponse,
// 		metadata: <NamedID>{},
// 	};

const newGetCountryCardsRequest = (countryID: string): IEvent =>
	<IEvent>{
		key: EventType.GET_COUNTRY_CARDS_REQUEST,
		metadata: <IdData>{
			ID: countryID,
		},
	};

const newGetCountryCardsResult = (/* countryID: string, countryName: string */): IEvent =>
	<IEvent>{
		key: EventType.GET_COUNTRY_CARDS_RESULT,
		// metadata: <NamedID>{
		// 	ID: countryID,
		// 	name: countryName
		// },
		metadata: <Empty>{},
	};

const newGetCountryCardsError = (error: Error): IEvent =>
	<IEvent>{
		key: EventType.GET_COUNTRY_CARDS_ERROR,
		metadata: <ErrorMsgData>{
			error,
		},
	};

export {
	newGetCountryCardsRequest,
	newGetCountryCardsResult,
	newGetCountryCardsError,
	// newGetCountryCardsError,
	// newInitCountryRequest,
	// newInitCountryResponse,
};
