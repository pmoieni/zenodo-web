import { Timer, TimerFinishEvent, TimerTickEvent } from "../timer/timer";

export const taskTypes = ["work", "break"]
export type TaskType = typeof taskTypes[number]

export const taskPriorities = ["low", "mediuem", "high"]
export type TaskPriority = typeof taskPriorities[number]

export interface Task {
	typ: TaskType;
	category: string;
	duration: number;
	priority: TaskPriority;
	pausable: boolean;
}

export interface SessionState {
	timer: Timer;
}

class SessionFinishEvent extends CustomEvent<SessionState> {
	static type: "sessionmanagerfinish" = "sessionmanagerfinish";

	constructor(detail: SessionState) {
		super(SessionFinishEvent.type, { detail });
	}
}

export class Session extends EventTarget {
	private queue: [Task, ...Task[]];
	private state: SessionState;
	private currSessionIdx: number = 0;

	constructor(queue: [Task, ...Task[]]) {
		super();

		if (queue.length === 0) {
			throw new Error("queue must contain at least one item");
		}

		this.queue = queue;
		this.state = {
			timer: new Timer(queue[queue.length - 1].duration, 1000),
		};
	}

	private onTimerTick(event: TimerTickEvent): void { }

	private onTimerFinish(event: TimerFinishEvent): void {
		this.queue.pop();
		this.next();
	}

	private next() {
		if (this.currSessionIdx + 1 > this.queue.length - 1) {
			this.dispatchEvent(new SessionFinishEvent(this.state));
			return;
		}

		this.state.timer.addEventListener(TimerTickEvent.type, (event: Event) =>
			this.onTimerTick(event as TimerTickEvent)
		);

		this.state.timer.addEventListener(
			TimerFinishEvent.type,
			(event: Event) => this.onTimerFinish(event as TimerFinishEvent)
		);

		this.state.timer.start();
	}

	public start(): void {
		this.next();
	}
}
