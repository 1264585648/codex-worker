export interface WorkerEvent {
  id: string;
  type: string;
  taskId?: string;
  payload?: unknown;
  createdAt: number;
}

export class EventRepository {
  private events: WorkerEvent[] = [];

  append(type: string, taskId?: string, payload?: unknown) {
    const event: WorkerEvent = {
      id: crypto.randomUUID(),
      type,
      taskId,
      payload,
      createdAt: Date.now(),
    };

    this.events.push(event);
    return event;
  }

  list(taskId?: string) {
    return taskId
      ? this.events.filter(item => item.taskId === taskId)
      : this.events;
  }
}
