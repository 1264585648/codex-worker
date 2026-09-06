import { TaskRepository } from '../storage/task-repository';
import { CodexExecutor } from '../executor/codex-executor';

export class WorkerLoop {
  private running = false;

  constructor(
    private readonly tasks: TaskRepository,
    private readonly executor: CodexExecutor
  ) {}

  async start() {
    this.running = true;

    while (this.running) {
      const task = this.tasks.nextQueued();

      if (!task) {
        await this.sleep(3000);
        continue;
      }

      this.tasks.updateStatus(task.id, 'RUNNING');

      try {
        await this.executor.run(task.workspace, task.prompt);
        this.tasks.updateStatus(task.id, 'COMPLETED');
      } catch {
        this.tasks.updateStatus(task.id, 'FAILED');
      }
    }
  }

  stop() {
    this.running = false;
  }

  private sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
