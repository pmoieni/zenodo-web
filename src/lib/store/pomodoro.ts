import { writable } from "svelte/store";
import type { Task } from "../types";

export interface PomodoroState {
    tasks: Task[];
}

export const pomodoroState = writable<PomodoroState>({
    tasks: [],
});
