import evtStore from "$lib/eventStreamStore";

export async function GET({ requestEvent }) {
    // ADD SOME AUTHORISATION LOGIC
    const { params } = requestEvent;
	const { userId } = params;
    const stream = new ReadableStream({
        start(controller) {
            const evt = evtStore.receive()
            if (evt && evt.target === userId ) {
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



