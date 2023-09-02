export interface State {
    isRunning: boolean
    startTime: number
    resumeTime: number
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
            resumeTime: 0,
            elapsed: 0,
            finished: false
        })

        this.duration = duration
        this.interval = interval
        this.onFinish = onFinish
        this.callback = callback
    }

    private elapsedSinceStart() {
        const currState = this.stateManager.get()

        if (currState.startTime === 0) {
            return 0
        }

        return Date.now() - currState.startTime
    }

    private elapsedSinceLastResume() {
        const currState = this.stateManager.get()

        if (currState.resumeTime === 0) {
            return 0
        }

        return Date.now() - currState.resumeTime
    }

    run() {
        let expected = Date.now() + this.interval

        const step = () => {
            const currState = this.stateManager.get()
            const now = Date.now()

            let delta = now - expected

            if (delta > this.interval) {
                expected += this.interval * Math.floor(delta / this.interval)
            }

            this.stateManager.set({
                ...currState,
                elapsed: this.elapsedSinceStart()
            })

            if (this.callback) {
                this.callback()
            }

            // timer finished
            if (now - (currState.startTime + this.duration) > 0) {
                this.stateManager.set({
                    // requires new state
                    ...this.stateManager.get(),
                    isRunning: false,
                    finished: true
                })

                clearTimeout(this.timeoutID)

                if (this.onFinish) {
                    this.onFinish()
                }

                return
            }

            expected += this.interval
            this.timeoutID = setTimeout(step, Math.max(0, this.interval - delta))
        }

        this.timeoutID = setTimeout(step, this.interval)
    }

    start() {
        const currState = this.stateManager.get()

        if (currState.isRunning) {
            return console.error("Ticker is already running")
        }

        this.stateManager.set({
            ...currState,
            isRunning: true,
            startTime: currState.startTime === 0 ? Date.now() : currState.startTime,
            resumeTime: Date.now()
        })

        this.run()
    }

    pause() {
        const currState = this.stateManager.get()

        if (!currState.isRunning) {
            return console.error("Ticker is already stopped")
        }

        this.stateManager.set({
            ...currState,
            isRunning: false,
            elapsed: currState.elapsed + this.elapsedSinceLastResume()
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
}
