import { writable } from 'svelte/store';

const evtSourceStore = writable([]);


evtSourceStore.send = (evt: ServerSentEvent) => {
  evtSourceStore.update((evts: ServerSentEvent[]) => {
    evts.push(evt);
    return evts;
  })
}

evtSourceStore.receive = () => {
  let element = null as ServerSentEvent | null
  evtSourceStore.update((evts: ServerSentEvent[]) => {
    element = evts.pop() as ServerSentEvent
    return evts;
  })
  return element
}

export default evtSourceStore;


