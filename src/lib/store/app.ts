import { writable } from "svelte/store";
import type { Task } from "../core/session";

export interface AppState {
	windows: {
		settingsOpen: boolean;
		newTaskModalOpen: boolean;
	},
	tasks: Task[],
}


export const appState = writable<AppState>({
	windows: {
		settingsOpen: false,
		newTaskModalOpen: false,
	},
	tasks: [],
});
