import type { Timer } from "../core/timer";

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

export type Enumerate<
    N extends number,
    Acc extends number[] = [],
> = Acc["length"] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

export type IntRange<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>;

export enum TaskType {
    WORK = "work",
    BREAK = "break",
}

export enum TaskPriority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
}

export interface QueueItem {
    timer: Timer;
    duration: number;
    pausable: boolean;
}

export interface Task extends QueueItem {
    title: string;
    type: TaskType;
    priority: TaskPriority;
}
