import evtStore from "$lib/eventStreamStore";

export async function GET({ url }) {

    // SOME AUTHORISATION LOGIC
    const stream = new ReadableStream({
        start(controller) {
            const evt = evtStore.receive()
            if (evt) {
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



