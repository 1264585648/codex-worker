import type { Task } from '../types.js';

export interface TaskProvider {
  next(): Promise<Task | undefined>;
  updateStatus(id: string, status: Task['status']): Promise<void>;
}

export interface TaskExecutor {
  execute(task: Task): Promise<{ output?: string; error?: string }>;
}

export class WorkerRuntime {
  private running = false;

  constructor(
    private readonly tasks: TaskProvider,
    private readonly executor: TaskExecutor,
    private readonly interval = 5000,
  ) {}

  async start() {
    this.running = true;

    while (this.running) {
      const task = await this.tasks.next();

      if (!task) {
        await this.sleep();
        continue;
      }

      await this.tasks.updateStatus(task.id, 'RUNNING');

      try {
        const result = await this.executor.execute(task);
        await this.tasks.updateStatus(
          task.id,
          result.error ? 'FAILED' : 'COMPLETED',
        );
      } catch {
        await this.tasks.updateStatus(task.id, 'FAILED');
      }
    }
  }

  stop() {
    this.running = false;
  }

  private sleep() {
    return new Promise((resolve) => setTimeout(resolve, this.interval));
  }
}
