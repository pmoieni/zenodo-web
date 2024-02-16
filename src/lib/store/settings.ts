import { createStorage } from ".";

export interface SettingsState {
    breakDuration: number;
    autoStartSession: boolean;
    autoStartBreak: boolean;
    darkTheme: boolean;
}

function getOSTheme(): boolean {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export const settingsState = createStorage("SETTINGS_STORE", {
    breakDuration: 5,
    autoStartSession: false,
    autoStartBreak: false,
    darkTheme: getOSTheme(),
});
