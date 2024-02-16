interface TimerState {
    isRunning: boolean;
    startTime: number;
    resumeTime: number;
    elapsed: number;
}

const timerDefaultState = {
    isRunning: false,
    startTime: -1,
    resumeTime: -1,
    elapsed: -1,
};

class TimerFinishEvent extends CustomEvent<TimerState> {
    static type: string = "timerfinish";

    constructor(detail: TimerState) {
        super(TimerFinishEvent.type, { detail });
    }
}

class TimerTickEvent extends CustomEvent<TimerState> {
    static type: string = "timertick";

    constructor(detail: TimerState) {
        super(TimerTickEvent.type, { detail });
    }
}

class TimerErrorEvent extends CustomEvent<Error> {
    static type: string = "timererror";

    constructor(detail: Error) {
        super(TimerErrorEvent.type, { detail });
    }
}

class Timer extends EventTarget {
    private _state: TimerState = timerDefaultState;
    private _duration: number = 0; // timer duration in milliseconds
    private _interval: number; // tick event interval in milliseconds
    private _timeoutID = -1;

    constructor(interval: number) {
        super();

        this._interval = interval;
    }

    public set duration(duration: number) {
        this._duration = duration;
    }

    public get duration() {
        return this._duration;
    }

    setInterval(interval: number) {
        this._interval = interval;
    }

    private elapsedSinceStart() {
        if (this._state.startTime === -1) {
            return 0;
        }

        return Date.now() - this._state.startTime;
    }

    private elapsedSinceLastResume() {
        if (this._state.resumeTime === -1) {
            return 0;
        }

        return Date.now() - this._state.resumeTime;
    }

    run() {
        let expected = Date.now() + this._interval;

        const step = () => {
            const now = Date.now();

            // timer finished
            if (now - (this._state.startTime + this._duration) >= 0) {
                this.reset();

                this.dispatchEvent(new TimerFinishEvent(this._state));
                return;
            }

            const delta = now - expected;

            if (delta > this._interval) {
                expected += this._interval * Math.floor(delta / this._interval);
            }

            this._state.elapsed = this.elapsedSinceStart();

            expected += this._interval;
            this._timeoutID = window.setTimeout(
                step,
                Math.max(0, this._interval - delta)
            );

            this.dispatchEvent(new TimerTickEvent(this._state));
        };

        this._timeoutID = window.setTimeout(step, this._interval);
    }

    start(): void {
        if (this._state.isRunning) {
            this.dispatchEvent(
                new TimerErrorEvent(new Error("Ticker is already running"))
            );

            return;
        }

        this._state = {
            isRunning: true,
            startTime:
                this._state.startTime === -1
                    ? Date.now()
                    : this._state.startTime,
            resumeTime: Date.now(),
            elapsed: 0,
        };

        this.run();
    }

    pause(): void {
        if (!this._state.isRunning) {
            this.dispatchEvent(
                new TimerErrorEvent(new Error("Ticker is already stopped"))
            );

            return;
        }

        this._state.isRunning = false;
        this._state.elapsed =
            this._state.elapsed + this.elapsedSinceLastResume();

        window.clearTimeout(this._timeoutID);

        this.dispatchEvent(new TimerTickEvent(this._state));
    }

    reset(): void {
        window.clearTimeout(this._timeoutID);

        this._state = {
            isRunning: false,
            elapsed: 0,
            startTime: -1,
            resumeTime: -1,
        };

        this._duration = 0;

        this.dispatchEvent(new TimerTickEvent(this._state));
    }
}

export {
    type TimerState,
    timerDefaultState,
    TimerTickEvent,
    TimerFinishEvent,
    TimerErrorEvent,
    Timer,
};
