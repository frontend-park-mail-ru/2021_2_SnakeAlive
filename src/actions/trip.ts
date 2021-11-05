import { Empty, UUID, IEvent } from '@/dispatcher';
import { EventType } from '@/dispatcher/event_types';

const newGetTripRequest = (countryID: string): IEvent =>
	<IEvent>{
		key: EventType.GET_TRIP_REQUEST,
		metadata: <UUID>{
			ID: countryID,
		},
	};

const newGetTripResult = (): IEvent =>
	<IEvent>{
		key: EventType.GET_TRIP_RESPONSE,
		metadata: <Empty>{},
	};

export { newGetTripRequest, newGetTripResult };
