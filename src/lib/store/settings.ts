import { createStore } from "./store";

export interface SettingsState {
    breakDuration: number;
    autoStartSession: boolean;
    autoStartBreak: boolean;
    breakBetweenSessions: boolean;
    darkTheme: boolean;
}

function getOSTheme(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const settingsState = createStore<SettingsState>("SETTINGS_STORE", {
    breakDuration: 5,
    autoStartSession: false,
    autoStartBreak: false,
    breakBetweenSessions: true,
    darkTheme: getOSTheme(),
});
