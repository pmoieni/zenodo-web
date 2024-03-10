import { writable } from "svelte/store";

export interface AppState {
    windows: {
        tasks: boolean;
    };
}

export const appState = writable<AppState>({
    windows: {
        tasks: false,
    },
});
