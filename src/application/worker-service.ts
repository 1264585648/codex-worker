import { WorkerRuntime } from '../core/worker-runtime.js';
import { CodexExecutor } from '../executor/codex-executor.js';
import { listTasks, updateTaskStatus } from '../storage.js';

const provider = {
  async next() {
    return listTasks().find((task: any) => task.status === 'QUEUED');
  },
  async updateStatus(id: string, status: any) {
    updateTaskStatus(id, status);
  },
};

export function createWorkerRuntime() {
  return new WorkerRuntime(provider, new CodexExecutor());
}
