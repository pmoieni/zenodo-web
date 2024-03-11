import { writable } from "svelte/store";
import type { QueueItem, Task } from "../types";

export const taskQueue = writable<(QueueItem | Task)[]>([]);
