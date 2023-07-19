import { writable } from 'svelte/store';

export const requestSignal = writable(false);
export const requestSignalInsert = writable({ status: false, element: null });