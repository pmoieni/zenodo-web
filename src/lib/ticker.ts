export interface State {
    isRunning: boolean
    startTime: number
    elapsed: number
    finished: boolean
}

export interface StateManager {
    get: () => State,
    set: (value: State) => void
}

export class Timer {
    private stateManager: StateManager
    private duration: number
    private interval: number
    private onFinish: Function | undefined
    private callback: Function | undefined
    private timeoutID = 0

    constructor(stateManager: StateManager, duration: number, interval: number, onFinish?: Function, callback?: Function) {
        this.stateManager = stateManager

        stateManager.set({
            isRunning: false,
            startTime: 0,
            elapsed: 0,
            finished: false
        })

        this.duration = duration
        this.interval = interval
        this.onFinish = onFinish
        this.callback = callback
    }

    private elapsedSinceLastStart() {
        const currState = this.stateManager.get()

        if (currState.startTime === 0) {
            return 0
        }

        return Date.now() - currState.startTime
    }

    start() {
        const currState = this.stateManager.get()

        if (currState.isRunning) {
            return console.error("Ticker is already running")
        }

        this.stateManager.set({
            ...currState,
            isRunning: true,
            startTime: Date.now()
        })

        let expected = Date.now() + this.interval

        const step = () => {
            const currState = this.stateManager.get()
            const now = Date.now()

            console.log(now - (currState.startTime + this.duration))
            // timer finished
            if (now - (currState.startTime + this.duration) > 0) {
                this.stateManager.set({
                    ...currState,
                    isRunning: false,
                    finished: true
                })

                clearTimeout(this.timeoutID)

                if (this.onFinish) {
                    this.onFinish()
                }

                return
            }

            let delta = now - expected

            if (delta > this.interval) {
                expected += this.interval * Math.floor(delta / this.interval)
            }

            if (this.callback) {
                this.callback()
            }

            expected += this.interval
            this.timeoutID = setTimeout(step, Math.max(0, this.interval - delta))
        }

        this.timeoutID = setTimeout(step, this.interval)
    }

    stop() {
        const currState = this.stateManager.get()

        if (!currState.isRunning) {
            return console.error("Ticker is already stopped")
        }

        this.stateManager.set({
            ...currState,
            isRunning: false,
            elapsed: this.stateManager.get().elapsed + this.elapsedSinceLastStart()
        })

        clearTimeout(this.timeoutID)
    }

    reset() {
        const currState = this.stateManager.get()

        this.stateManager.set(((): State => {
            const newState = {
                ...currState,
                totalTime: 0
            }

            if (currState.isRunning) {
                newState.startTime = Date.now()
                clearTimeout(this.timeoutID)
                return newState
            }

            newState.startTime = 0
            return newState
        })())
    }

    elapsed() {
        const currState = this.stateManager.get()

        if (currState.startTime === 0) {
            return 0;
        }

        if (currState.isRunning) {
            return currState.elapsed + this.elapsedSinceLastStart();
        }

        return currState.elapsed;
    }
}
