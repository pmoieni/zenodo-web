export interface TimerState {
    isRunning: boolean;
    startTime: number;
    resumeTime: number;
    elapsed: number;
}

export const timerDefaultState = {
    isRunning: false,
    startTime: -1,
    resumeTime: -1,
    elapsed: -1,
};

type Callback = (v: TimerState) => void;
type OnFinish = () => void;

export class Timer {
    private state: TimerState = timerDefaultState;
    private duration: number;
    private interval: number;
    private callback: Callback;
    private onFinish: OnFinish | undefined;
    private timeoutID = 0;

    constructor(
        duration: number,
        interval: number,
        callback: Callback,
        onFinish?: OnFinish
    ) {
        this.duration = duration;
        this.interval = interval;
        this.onFinish = onFinish;
        this.callback = callback;
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
                this.onFinish && this.onFinish();
                return;
            }

            const delta = now - expected;

            if (delta > this.interval) {
                expected += this.interval * Math.floor(delta / this.interval);
            }

            this.state.elapsed = this.elapsedSinceStart();

            expected += this.interval;
            this.timeoutID = setTimeout(
                step,
                Math.max(0, this.interval - delta)
            );

            this.callback(this.state);
        };

        this.timeoutID = setTimeout(step, this.interval);
    }

    start() {
        if (this.state.isRunning) {
            return console.error("Ticker is already running");
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

    pause() {
        if (!this.state.isRunning) {
            return console.error("Ticker is already stopped");
        }

        this.state.isRunning = false;
        this.state.elapsed = this.state.elapsed + this.elapsedSinceLastResume();

        clearTimeout(this.timeoutID);

        this.callback(this.state);
    }

    reset() {
        clearTimeout(this.timeoutID);

        this.state = {
            isRunning: false,
            elapsed: 0,
            startTime: -1,
            resumeTime: -1,
        };

        this.callback(this.state);
    }
}
