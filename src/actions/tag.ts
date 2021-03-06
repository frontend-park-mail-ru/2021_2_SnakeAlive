import { Empty, EventType, IEvent, NamedUUID, UUID } from '@/dispatcher';

const newTagResponse = (tagName: string): IEvent =>
	<IEvent>{
		key: EventType.INIT_TAG_RESULT,
		metadata: <NamedUUID>{
			ID: tagName,
		},
	};

const newTagRequest = (tagName: string): IEvent =>
	<IEvent>{
		key: EventType.INIT_TAG_REQUEST,
		metadata: <UUID>{
			ID: tagName,
		},
	};

const newGetTagCardsResult = (): IEvent =>
	<IEvent>{
		key: EventType.GET_TAG_CARDS_RESULT,
		metadata: <Empty>{},
	};

export { newGetTagCardsResult, newTagRequest, newTagResponse };
