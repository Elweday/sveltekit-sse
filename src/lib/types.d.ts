enum EventType {
    newActiveUserEvent = "newActiveUserEvent"
}
type ServerSentEvent = {
    type: EventType;
    target: User;
    data: any;
};  

type User = {
    id: number;
    name: string;
}

type PageData = {
    activeUsers: User[];
}
