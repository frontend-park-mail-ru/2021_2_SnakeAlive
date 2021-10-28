export interface Empty {
}

export interface ID {
    ID: any;
}

export interface NamedID {
    ID: any;
    Name: string;
}

export type EventType = Empty | ID | NamedID;