export type RunStatus = 'RUNNING' | 'COMPLETED' | 'FAILED';

export interface RunRecord {
  id: string;
  taskId: string;
  status: RunStatus;
  output?: string;
  error?: string;
  startedAt: number;
  finishedAt?: number;
}

export class RunRepository {
  private runs: RunRecord[] = [];

  create(taskId: string): RunRecord {
    const run: RunRecord = {
      id: crypto.randomUUID(),
      taskId,
      status: 'RUNNING',
      startedAt: Date.now(),
    };

    this.runs.push(run);
    return run;
  }

  complete(id: string, output: string) {
    const run = this.runs.find(item => item.id === id);
    if (!run) return;
    run.status = 'COMPLETED';
    run.output = output;
    run.finishedAt = Date.now();
  }

  fail(id: string, error: string) {
    const run = this.runs.find(item => item.id === id);
    if (!run) return;
    run.status = 'FAILED';
    run.error = error;
    run.finishedAt = Date.now();
  }

  list(taskId?: string) {
    return taskId
      ? this.runs.filter(item => item.taskId === taskId)
      : this.runs;
  }
}
