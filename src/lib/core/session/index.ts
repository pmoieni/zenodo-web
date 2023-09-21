enum SessionType {
    WORK,
    BREAK,
}

enum Priority {
    LOW,
    MEDIUM,
    HIGH,
}

export interface Session {
    typ: SessionType;
    category: string;
    length: number;
    priority: Priority;
    pausable: boolean;
}

export class SessionManager {
    private queue: Session[];
    private currSessionIdx: number = 0;

    constructor(queue: Session[]) {
        this.queue = queue;
    }

    currSession(): Session {
        return this.queue[this.currSessionIdx];
    }

    start() { }

    next() {
        if (this.currSessionIdx + 1 > this.queue.length - 1) {
        }
    }
}
