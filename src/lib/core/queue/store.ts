import { derived, writable } from "svelte/store";
import type { createTask } from "./task";

export const _queue = writable<ReturnType<typeof createTask>[]>([]);

export const _isQueueFinished = derived(_queue, (queue) => queue.length === 0);
