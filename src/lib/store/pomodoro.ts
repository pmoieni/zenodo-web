import { timerDefaultState, type TimerState } from "../core/timer";
import { writable } from "svelte/store";

export interface PomodoroState {
    timer: TimerState;
}

export const pomodoroState = writable<PomodoroState>({
    timer: timerDefaultState,
});
