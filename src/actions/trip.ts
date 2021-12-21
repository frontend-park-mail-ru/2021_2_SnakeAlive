import { Empty, EventType, IEvent, NumID } from '@/dispatcher';
import { IsTrue, TripInfo, IDState, CardOrderAndDay, Email } from '@/dispatcher/metadata_types';
import { Sight, SightDay } from '@/models';

const newGetTripRequest = (tripID: number): IEvent =>
	<IEvent>{
		key: EventType.GET_TRIP_REQUEST,
		metadata: <NumID>{
			ID: tripID,
		},
	};

const wsUpdate = (): IEvent =>
	<IEvent>{
		key: EventType.WS_UPDATE,
	};

const newGetTripResult = (id: number): IEvent =>
	<IEvent>{
		key: EventType.GET_TRIP_RESPONSE,
		metadata: <NumID>{
			ID: id,
		},
	};

const createTripFormRequest = (title: string, description: string): IEvent =>
	<IEvent>{
		key: EventType.CREATE_TRIP_FORM_REQUEST,
		metadata: <TripInfo>{
			title,
			description,
		},
	};

const createTripEdit = (tripID: string, isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.CREATE_TRIP_EDIT,
		metadata: <IDState>{
			ID: tripID,
			state: isEdit,
		},
	};

const rerenderTripCards = (isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.RERENDER_TRIP_CARDS,
		metadata: <IsTrue>{
			isTrue: isEdit,
		},
	};

const updateCurrentTripInfo = (title: string, description: string) =>
	<IEvent>{
		key: EventType.UPDATE_CURRENT_TRIP_INFO,
		metadata: <TripInfo>{
			title,
			description,
		},
	};

const addPlaceToTrip = (sight: Sight, day: number) =>
	<IEvent>{
		key: EventType.ADD_CURRENT_TRIP_PLACE,
		metadata: <SightDay>{ sight, day },
	};

const delPlaceFromTrip = (CardId: number, day: number) =>
	<IEvent>{
		key: EventType.DEL_CURRENT_TRIP_PLACE,
		metadata: <CardOrderAndDay>{
			cardId: CardId,
			day,
		},
	};

const deleteTrip = () =>
	<IEvent>{
		key: EventType.DELETE_TRIP,
		metadata: <Empty>{},
	};

const shareTrip = () =>
	<IEvent>{
		key: EventType.SHARE_TRIP_REQUEST,
		metadata: <Empty>{},
	};

const newShareTripLink = () =>
	<IEvent>{
		key: EventType.SHARE_TRIP_RESPONSE,
		metadata: <Empty>{},
	};

const addUserToTrip = (email: string) =>
	<IEvent>{
		key: EventType.ADD_USER_TO_TRIP_REQUEST,
		metadata: <Email>{
			email,
		},
	};

const getAddUserToTripResponse = (isOk: boolean) =>
	<IEvent>{
		key: EventType.ADD_USER_TO_TRIP_RESPONSE,
		metadata: <IsTrue>{
			isTrue: isOk,
		},
	};

export {
	newGetTripRequest,
	newGetTripResult,
	createTripFormRequest,
	createTripEdit,
	updateCurrentTripInfo,
	addPlaceToTrip,
	delPlaceFromTrip,
	deleteTrip,
	shareTrip,
	newShareTripLink,
	rerenderTripCards,
	addUserToTrip,
	getAddUserToTripResponse,
	wsUpdate,
};
