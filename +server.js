// SSE only supports GET request
import evtStore from "$lib/eventStream";

export async function GET({ url }) {
    const stream = new ReadableStream({
        start(controller) {
            const evt = evtStore.receive()
            if (evt) {
                console.log("event sent: ", evt)
                controller.enqueue(`data: ${JSON.stringify(evt)}\n\n`)
            }
            controller.close() 
        },
        cancel() {
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream', 
            'Cache-Control': 'no-cache', 
        }
    })
}



