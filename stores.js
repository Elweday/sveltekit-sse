import { localStorageStore } from '@skeletonlabs/skeleton';

import { writable } from 'svelte/store';

const eventStore = writable([]);

const themeStore = localStorageStore('theme', 'the-theme');
export {themeStore, eventStore};