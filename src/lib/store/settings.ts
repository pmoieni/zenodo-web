import { createStorage } from ".";

export interface Duration {
    hours: number;
    minutes: number;
    seconds: number;
}

export interface SettingsState {
    sessionDuration: Duration;
    breakDuration: Duration;
    sessionCount: number;
    autoStartSession: boolean;
    autoStartBreak: boolean;
    darkTheme: boolean;
}

function getOSTheme(): boolean {
    const prefersDarkMq = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkMq.matches ? true : false;
}

export const settingsState = createStorage("SETTINGS_STORE", {
    sessionDuration: {
        hours: 0,
        minutes: 25,
        seconds: 0,
    },
    breakDuration: {
        hours: 0,
        minutes: 5,
        seconds: 0,
    },
    sessionCount: 3,
    autoStartSession: false,
    autoStartBreak: false,
    darkTheme: getOSTheme(),
});
