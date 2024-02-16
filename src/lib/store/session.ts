import { writable } from "svelte/store";

export const pomodoroState = writable<SessionState>({
    tasks: [],
});
