import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export const createStore = <T>(key: string, initValue: T): Writable<T> => {
    const storedValue = localStorage.getItem(key);
    let store: Writable<T>;

    if (storedValue) {
        const parsed = JSON.parse(storedValue) as T;
        store = writable<T>(parsed);
    } else {
        store = writable<T>(initValue);
    }

    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
};
