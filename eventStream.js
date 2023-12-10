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


