import {EventType} from "./metadata_types";

export interface Event {
    key: string;
    metadata: EventType;
}