import { writable } from "svelte/store";

export interface AppState {
    windows: {
        settingsOpen: boolean;
        newTaskModalOpen: boolean;
        tasks: boolean;
    };
}

export const appState = writable<AppState>({
    windows: {
        settingsOpen: false,
        newTaskModalOpen: false,
        tasks: false,
    },
});
