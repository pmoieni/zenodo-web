export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Enumerate<
	N extends number,
	Acc extends number[] = [],
> = Acc["length"] extends N
	? Acc[number]
	: Enumerate<N, [...Acc, Acc["length"]]>;

export type IntRange<F extends number, T extends number> = Exclude<
	Enumerate<T>,
	Enumerate<F>
>;

export class Duration {
	private _hours: number;
	private _minutes: number;
	private _seconds: number;

	constructor(hours: number, minutes: number, seconds: number) {
		this._hours = hours
		this._minutes = minutes
		this._seconds = seconds
	}

	public get hours(): number {
		return this._hours
	}

	public set hours(hours: number) {
		this._hours = hours
	}

	public get minutes(): number {
		return this._minutes
	}

	public set minutes(minutes: number) {
		this._minutes = minutes
	}

	public get seconds(): number {
		return this._seconds
	}

	public set seconds(seconds: number) {
		this._seconds = seconds
	}

	public toMilliseconds(): number {
		return (
			(this._hours * 60 * 60 +
				this._minutes * 60 +
				this._seconds) *
			1000
		);
	}

	public static parseMilliseconds(ms: number) {
		if (ms <= 0) {
			return "00s";
		}

		// get hours from milliseconds
		const hours = ms / (1000 * 60 * 60);
		const absoluteHours = Math.floor(hours);
		const h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

		// get remainder from hours and convert to minutes
		const minutes = (hours - absoluteHours) * 60;
		const absoluteMinutes = Math.floor(minutes);
		const m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

		// get remainder from minutes and convert to seconds
		const seconds = (minutes - absoluteMinutes) * 60;
		const absoluteSeconds = Math.floor(seconds);
		const s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

		return (
			(h === "00" ? "" : h + "h ") +
			(m === "00" ? "" : m + "m ") +
			s +
			"s"
		);
	}
}
