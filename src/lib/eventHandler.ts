
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

function hookPageData(pageData: PageData, evtSource: EventSource) {

    evtSource.onmessage = (e: ServerSentEvent) => {
        switch (e.type) {
            case EventType.newActiveUserEvent:
                const user = JSON.parse(e.data) as User;
                pageData.activeUsers.push(user);
                break;
            default:
                break;
            
        }
        
    }
}



export default hookPageData