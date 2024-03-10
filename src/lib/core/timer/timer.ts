interface TimerState {
    startTime: number;
    pauseTime: number;
    totalPause: number;
    duration: number;
    elapsed: number;
}

export const timerDefaultState: TimerState = {
    startTime: -1,
    pauseTime: -1,
    totalPause: 0,
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
        if (this.state.startTime == -1) {
            return 0;
        }

        return Date.now() - this.state.startTime;
    }

    private run() {
        this.isRunning = true;

        let expected = Date.now() + this.interval;

        const step = () => {
            const now = Date.now();

            // timer finished
            if (now - (this.state.startTime + this.state.duration) >= 0) {
                this.dispatchEvent(new TimerFinishEvent(this.state));
                return;
            }

            const delta = now - expected;

            if (delta > this.interval) {
                expected += this.interval * Math.floor(delta / this.interval);
            }

            this.state.elapsed =
                this.elapsedSinceStart() - this.state.totalPause;

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

        const now = Date.now();

        this.state = {
            ...this.state,
            startTime: this.state.startTime == -1 ? now : this.state.startTime,
            totalPause:
                this.state.pauseTime == -1
                    ? 0
                    : this.state.totalPause + (now - this.state.pauseTime),
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

        window.clearTimeout(this.timeoutID);
        this.state.pauseTime = Date.now();
        this.isRunning = false;
        this.dispatchEvent(new TimerTickEvent(this.state));
    }

    reset() {
        window.clearTimeout(this.timeoutID);
        this.state = timerDefaultState;
        this.isRunning = false;
        this.dispatchEvent(new TimerTickEvent(this.state));
    }
}
