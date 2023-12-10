
enum EventType {
    newGradeEvent = "newGradeEvent"
}
type ServerSentEvent = {
    type: EventType;
    data: any;
};  

function dataHandler(data: any, evt: ServerSentEvent) {
    switch (evt.type) {
        case EventType.newGradeEvent:
            data.studentData.push(evt.data);
            break;
        default:
            break;
        
    }
}

export default dataHandler