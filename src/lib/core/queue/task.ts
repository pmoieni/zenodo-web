import { get, writable } from "svelte/store";

export type TaskType = "work" | "break";

export type TaskPriority = "low" | "medium" | "high";

export interface ITaskInfo {
    title?: string;
    type?: TaskType;
    priority?: TaskPriority;
    pausable: boolean;
    cancelable: boolean;
}

export interface ITask {
    duration: number;
    elapsed: number;
    isRunning: boolean;
    finished: boolean;
    info: ITaskInfo;
}

export const taskDefaultState: ITask = {
    duration: 0,
    elapsed: 0,
    isRunning: false,
    finished: false,
    info: {
        pausable: false,
        cancelable: false,
    },
};

export function createTask(
    info: ITaskInfo,
    duration: number,
    interval: number,
    onFinish?: () => void
) {
    const state = writable<ITask>({
        ...taskDefaultState,
        duration,
        info,
    });
    const { subscribe, update } = state;

    let startTime = -1;
    let pauseTime = -1;
    let totalPause = 0;
    let timeoutID = -1;

    const elapsedSinceStart = () =>
        startTime == -1 ? 0 : Date.now() - startTime;

    const run = () => {
        update((v) => {
            v.isRunning = true;
            return v;
        });

        let expected = Date.now() + interval;

        const step = () => {
            if (get(state).finished) return;

            const now = Date.now();

            // timer finished
            if (now - (startTime + duration + totalPause) >= 0) {
                window.clearTimeout(timeoutID);
                update((v) => {
                    v.isRunning = false;
                    v.finished = true;
                    return v;
                });

                onFinish && onFinish();
                return;
            }

            const delta = now - expected;

            if (delta > interval) {
                expected += interval * Math.floor(delta / interval);
            }

            update((v) => {
                v.elapsed = elapsedSinceStart() - totalPause;
                return v;
            });

            expected += interval;
            timeoutID = window.setTimeout(step, Math.max(0, interval - delta));
        };

        timeoutID = window.setTimeout(step, interval);
    };

    const start = () => {
        if (get(state).isRunning) return;

        const now = Date.now();

        startTime = startTime == -1 ? now : startTime;
        totalPause = pauseTime == -1 ? 0 : totalPause + (now - pauseTime);

        run();
    };

    const pause = () => {
        if (!get(state).isRunning || !info.pausable) return;

        window.clearTimeout(timeoutID);
        pauseTime = Date.now();
        update((v) => {
            v.isRunning = false;
            return v;
        });
    };

    const cancel = () => {
        if (!info.cancelable) return;

        window.clearTimeout(timeoutID);
        startTime = -1;
        pauseTime = -1;
        totalPause = 0;
        timeoutID = -1;
        update((v) => {
            v = {
                ...taskDefaultState,
                duration,
                info: v.info,
            };
            return v;
        });
    };

    return {
        subscribe,
        start,
        pause,
        cancel,
    };
}
