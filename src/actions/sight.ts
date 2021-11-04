import { Empty, IdData, IEvent } from '@/dispatcher';
import { EventType } from '@/dispatcher/event_types';

const newGetSightRequest = (countryID: string): IEvent =>
	<IEvent>{
		key: EventType.GET_SIGHT_REQUEST,
		metadata: <IdData>{
			ID: countryID,
		},
	};

const newGetSightResult = (): IEvent =>
	<IEvent>{
		key: EventType.GET_SIGHT_RESPONSE,
		metadata: <Empty>{},
	};


export {
	newGetSightRequest,
	newGetSightResult,
};
