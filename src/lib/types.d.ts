enum EventType {
    newActiveUserEvent = "newActiveUserEvent"
}
type ServerSentEvent = {
    type: EventType;
    data: any;
};  

type User = {
    id: number;
    name: string;
}

type PageData = {
    activeUsers: User[];
}
