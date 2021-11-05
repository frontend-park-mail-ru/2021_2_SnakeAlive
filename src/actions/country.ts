import { Empty, ErrorMsgData, EventType, IdData, IEvent, NamedID } from '@/dispatcher';

const newInitCountryRequest = (name: string, id: string): IEvent =>
	<IEvent>{
		key: EventType.INIT_COUNTRY_REQUEST,
		metadata: <NamedID>{
			name,
			ID: id,
		},
	};

const newInitCountryResponse = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_COUNTRY_RESPONSE,
		metadata: <NamedID>{},
	};

const newGetCountryCardsRequest = (countryName: string, countryID: string): IEvent =>
	<IEvent>{
		key: EventType.GET_COUNTRY_CARDS_REQUEST,
		metadata: <NamedID>{
			ID: countryID,
			name: countryName
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
	newInitCountryRequest,
	newInitCountryResponse
	// newGetCountryCardsError,
	// newInitCountryRequest,
	// newInitCountryResponse,
};
