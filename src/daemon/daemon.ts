import { WorkerRuntime } from '../core/worker-runtime.js';

export class WorkerDaemon {
  constructor(private readonly runtime: WorkerRuntime) {}

  async start() {
    process.once('SIGINT', () => this.runtime.stop());
    process.once('SIGTERM', () => this.runtime.stop());

    await this.runtime.start();
  }
}
