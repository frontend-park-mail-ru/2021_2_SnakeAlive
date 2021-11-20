import { Empty, EventType, IEvent } from '@/dispatcher';
import { SightToTrip, IsTrue, TripInfo, IDState } from '@/dispatcher/metadata_types';

const newGetTripRequest = (tripID: string, isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.GET_TRIP_REQUEST,
		metadata: <IDState>{
			ID: tripID,
			state: isEdit,
		},
	};

const newGetTripResult = (isEdit: boolean): IEvent =>
	<IEvent>{
		key: EventType.GET_TRIP_RESPONSE,
		metadata: <IsTrue>{
			isTrue: isEdit,
		},
	};

const createTripFormRequest = (): IEvent =>
	<IEvent>{
		key: EventType.CREATE_TRIP_FORM_REQUEST,
		metadata: <Empty>{},
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

const addCurrentTripPlace = (sightId: number, day: number) =>
	<IEvent>{
		key: EventType.ADD_CURRENT_TRIP_PLACE,
		metadata: <SightToTrip>{
			sightId,
			day,
		},
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
	// tripFormSubmit,
	updateCurrentTripInfo,
	addCurrentTripPlace,
	sendTrip,
	// createFilledEditTrip,
	deleteTrip,
	deleteCurrentTripPlace,
	rerenderTripCards,
};
