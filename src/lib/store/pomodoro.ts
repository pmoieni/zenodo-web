import { writable } from "svelte/store";
import type { Task } from "../types";

export const taskQueue = writable<Task[]>([]);
