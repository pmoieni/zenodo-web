interface TimerState {
    startTime: number;
    resumeTime: number;
    duration: number;
    elapsed: number;
}

export const timerDefaultState = {
    startTime: -1,
    resumeTime: -1,
    duration: 0,
    elapsed: 0,
};

export class TimerFinishEvent extends CustomEvent<TimerState> {
    static type: string = "timerfinish";

    constructor(detail: TimerState) {
        super(TimerFinishEvent.type, { detail });
    }
}

export class TimerTickEvent extends CustomEvent<TimerState> {
    static type: string = "timertick";

    constructor(detail: TimerState) {
        super(TimerTickEvent.type, { detail });
    }
}

export class TimerErrorEvent extends CustomEvent<Error> {
    static type: string = "timererror";

    constructor(detail: Error) {
        super(TimerErrorEvent.type, { detail });
    }
}

export class Timer extends EventTarget {
    private state: TimerState = timerDefaultState;
    private isRunning = false;
    private interval: number; // tick event interval in milliseconds
    private timeoutID = -1;

    constructor(duration: number, interval: number) {
        super();

        this.state.duration = duration;
        this.interval = interval;
    }

    private elapsedSinceStart() {
        if (this.state.startTime === -1) {
            return 0;
        }

        return Date.now() - this.state.startTime;
    }

    private elapsedSinceLastResume() {
        if (this.state.resumeTime === -1) {
            return 0;
        }

        return Date.now() - this.state.resumeTime;
    }

    private run() {
        let expected = Date.now() + this.interval;

        const step = () => {
            const now = Date.now();

            // timer finished
            if (now - (this.state.startTime + this.state.duration) >= 0) {
                this.reset();

                this.dispatchEvent(new TimerFinishEvent(this.state));
                return;
            }

            const delta = now - expected;

            if (delta > this.interval) {
                expected += this.interval * Math.floor(delta / this.interval);
            }

            this.state.elapsed = this.elapsedSinceStart();

            expected += this.interval;
            this.timeoutID = window.setTimeout(
                step,
                Math.max(0, this.interval - delta)
            );

            this.dispatchEvent(new TimerTickEvent(this.state));
        };

        this.timeoutID = window.setTimeout(step, this.interval);
    }

    isStarted() {
        return this.state.startTime != -1;
    }

    start() {
        if (this.isRunning) {
            this.dispatchEvent(
                new TimerErrorEvent(new Error("Ticker is already running"))
            );

            return;
        }

        this.state = {
            ...this.state,
            startTime:
                this.state.startTime == -1 ? Date.now() : this.state.startTime,
            elapsed: this.state.elapsed + this.elapsedSinceLastResume(),
            resumeTime: Date.now(),
        };

        this.run();
    }

    pause() {
        if (!this.isRunning) {
            this.dispatchEvent(
                new TimerErrorEvent(new Error("Ticker is already stopped"))
            );

            return;
        }

        this.isRunning = false;

        window.clearTimeout(this.timeoutID);

        this.dispatchEvent(new TimerTickEvent(this.state));
    }

    reset() {
        window.clearTimeout(this.timeoutID);

        this.state = {
            elapsed: 0,
            duration: 0,
            startTime: -1,
            resumeTime: -1,
        };

        this.dispatchEvent(new TimerTickEvent(this.state));
    }
}
