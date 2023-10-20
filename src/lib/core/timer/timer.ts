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
    static type: "timerfinish" = "timerfinish";

    constructor(detail: TimerState) {
        super(TimerFinishEvent.type, { detail });
    }
}

class TimerTickEvent extends CustomEvent<TimerState> {
    static type: "timertick" = "timertick";

    constructor(detail: TimerState) {
        super(TimerTickEvent.type, { detail });
    }
}

class TimerErrorEvent extends CustomEvent<Error> {
    static type: "timererror" = "timererror";

    constructor(detail: Error) {
        super(TimerErrorEvent.type, { detail });
    }
}

class Timer extends EventTarget {
    private state: TimerState = timerDefaultState;
    private duration: number;
    private interval: number;
    private timeoutID = -1;

    constructor(duration: number, interval: number) {
        super();

        this.duration = duration;
        this.interval = interval;

        // initialize WASM module
    }

    setDuration(duration: number) {
        this.duration = duration;
    }

    setInterval(interval: number) {
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

    run() {
        let expected = Date.now() + this.interval;

        const step = () => {
            const now = Date.now();

            // timer finished
            if (now - (this.state.startTime + this.duration) >= 0) {
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

    start(): void {
        if (this.state.isRunning) {
            this.dispatchEvent(
                new TimerErrorEvent(new Error("Ticker is already running"))
            );

            return
        }

        this.state = {
            isRunning: true,
            startTime:
                this.state.startTime === -1 ? Date.now() : this.state.startTime,
            resumeTime: Date.now(),
            elapsed: 0,
        };

        this.run();
    }

    pause(): void {
        if (!this.state.isRunning) {
            this.dispatchEvent(
                new TimerErrorEvent(new Error("Ticker is already stopped"))
            );

            return
        }

        this.state.isRunning = false;
        this.state.elapsed = this.state.elapsed + this.elapsedSinceLastResume();

        window.clearTimeout(this.timeoutID);

        this.dispatchEvent(new TimerTickEvent(this.state));
    }

    reset(): void {
        window.clearTimeout(this.timeoutID);

        this.state = {
            isRunning: false,
            elapsed: 0,
            startTime: -1,
            resumeTime: -1,
        };

        this.dispatchEvent(new TimerTickEvent(this.state));
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
