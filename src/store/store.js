import { writable } from 'svelte/store';

// Cria um store writable para o sinal de nova request
export const requestSignal = writable(false);