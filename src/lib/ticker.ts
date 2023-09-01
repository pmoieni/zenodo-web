export interface TickerCallback {
    interval: number
    fn: Function
}

export class Ticker {
    private isRunning = false
    private startTime = 0
    private totalTime = 0
    private callback: TickerCallback

    constructor(callback: TickerCallback) {
        this.callback = callback
    }

    private elapsedSinceLastStart() {
        if (this.startTime === 0) {
            return 0
        }

        return Date.now() - this.startTime
    }

    start() {
        if (this.isRunning) {
            return console.error("Ticker is already running")
        }

        this.isRunning = true
        this.startTime = Date.now()

        if (this.callback) {
            let expected = Date.now() + this.callback.interval

            const step = () => {
                const dt = Date.now() - expected
                if (dt > this.callback.interval) {
                    return console.error("oops, something went wrong")
                }

                this.callback.fn()

                expected += this.callback.interval
                setTimeout(step, Math.max(0, this.callback.interval - dt))
            }
        }

    }

    stop() {
        if (!this.isRunning) {
            return console.error("Ticker is already stopped")
        }

        this.isRunning = false
        this.totalTime = this.totalTime + this.elapsedSinceLastStart()
    }

    reset() {
        this.totalTime = 0

        if (this.isRunning) {
            this.startTime = Date.now()
            return
        }

        this.startTime = 0
    }

    elapsed() {
        if (this.startTime === 0) {
            return 0;
        }

        if (this.isRunning) {
            return this.totalTime + this.elapsedSinceLastStart();
        }

        return this.totalTime;
    }
}
