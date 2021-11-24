import { Empty, ErrorMsgData, EventType, IEvent, NamedUUID } from '@/dispatcher';

const newInitCountryRequest = (name: string, id: string): IEvent =>
	<IEvent>{
		key: EventType.INIT_COUNTRY_REQUEST,
		metadata: <NamedUUID>{
			name,
			ID: id,
		},
	};

const newInitCountryResponse = (): IEvent =>
	<IEvent>{
		key: EventType.INIT_COUNTRY_RESPONSE,
		metadata: <NamedUUID>{},
	};

const newGetCountryCardsRequest = (countryName: string, countryID: string): IEvent =>
	<IEvent>{
		key: EventType.GET_COUNTRY_CARDS_REQUEST,
		metadata: <NamedUUID>{
			ID: countryID,
			name: countryName,
		},
	};

const newGetCountryCardsResult = (/* countryID: string, countryName: string */): IEvent =>
	<IEvent>{
		key: EventType.GET_COUNTRY_CARDS_RESULT,
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
	newInitCountryResponse,
};
