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


- Second we get out endpoint ready at `GET /api/sse/[userId]`
```ts
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


## Finally you can use it in the client
```js
    import { onMount } from 'svelte';
    import hookPageData from '$lib/eventHandler';
    export let data;
    let TOKEN = 'TOKEN';
    onMount(() => {
        const eventSource = new EventSource(resoureUrl, {
            headers: {
                'Authorization': 'Bearer ' + TOKEN // needs to be validated on the endpoint.
            }
        });
        hookPageData(data, eventSource);
    })
``` 



