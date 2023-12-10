# sveltekit-sse
How to implement store-based Server Sent Events using sveltekit
- First we make a svelte store that works as a channel to trigger new events
```ts
import { writable } from 'svelte/store';

const evtSourceStore = writable([]);


evtSourceStore.send = (evt) => {
  evtSourceStore.update((value) => {
    value.push(evt);
    return value;
  })
}

evtSourceStore.receive = () => {
  let element = null
  evtSourceStore.update((value) => {
    element = value.pop()
    return value;
  })
  return element
}

export default evtSourceStore;
```


- Second we get out endpoint ready at `GET /api/sse`
```ts
import evtStore from "$lib/eventStreamStore";

export async function GET({ url }) {
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
```

- now we can make our post endpoints trigger events
## Example: notify user friends Upon Login `/api/auth/login`.
```ts 
import db from "$lib/prisma";
import evtStore from "$lib/eventStreamStore";

export async function POST({ request }) {
    const user = await db.users.findFirst({
        // Whatever your query is
    })
    if (!user) {
		// catch errors
	}
    // whatever your login logic is 
    
    user.friends.array.forEach((friend : User) => {
        evtStore.send({
            type: "newActiveUserEvent",
            data: JSON.stringify(user)
        });
        
    });
	return new Response(`Login successful.`, {status: 200});
}
``` 



