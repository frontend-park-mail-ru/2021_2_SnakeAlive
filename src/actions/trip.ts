import { Empty, EventType, IEvent, NumID } from '@/dispatcher';
import { SightToTrip, IsTrue, TripInfo, IDState } from '@/dispatcher/metadata_types';
import { Sight, SightDay } from '@/models';

const newGetTripRequest = (tripID: number): IEvent =>
	<IEvent>{
		key: EventType.GET_TRIP_REQUEST,
		metadata: <NumID>{
			ID: tripID,
		},
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
		metadata: <SightDay>{sight, day}
	};

const deleteCurrentTripPlace = (sightId: number, day: number) =>
	<IEvent>{
		key: EventType.DELETE_CURRENT_TRIP_PLACE,
		metadata: <SightToTrip>{
			sightId,
			day,
		},
	};

const sendTrip = () =>
	<IEvent>{
		key: EventType.SEND_TRIP,
		metadata: <Empty>{},
	};

const deleteTrip = () =>
	<IEvent>{
		key: EventType.DELETE_TRIP,
		metadata: <Empty>{},
	};


export {
	newGetTripRequest,
	newGetTripResult,
	createTripFormRequest,
	createTripEdit,
	// tripFormSubmit,
	updateCurrentTripInfo,
	addPlaceToTrip,
	//sendTrip,
	// createFilledEditTrip,
	deleteTrip,
	deleteCurrentTripPlace,
	rerenderTripCards,
};
