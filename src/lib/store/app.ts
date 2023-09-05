import { writable } from "svelte/store";

export interface AppState {
    settingsOpen: boolean;
}

export const appState = writable<AppState>({
    settingsOpen: false,
});
