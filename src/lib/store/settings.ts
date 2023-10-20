import { createStorage } from ".";
import { Duration } from "../types";

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
	sessionDuration: new Duration(0, 25, 0),
	breakDuration: new Duration(0, 5, 0),
	sessionCount: 3,
	autoStartSession: false,
	autoStartBreak: false,
	darkTheme: getOSTheme(),
});
