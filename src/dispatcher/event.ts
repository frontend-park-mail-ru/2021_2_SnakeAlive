import { DataType } from '.';
import { EventType } from './event_types';

export interface IEvent {
	key: EventType;
	metadata: DataType;
}
