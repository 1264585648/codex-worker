import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { TaskContext } from './types.js';

export class ContextManager {
  constructor(private readonly root = '.codex-worker') {}

  save(context: TaskContext) {
    const file = this.file(context.taskId);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(context, null, 2));
    return file;
  }

  load(taskId: string): TaskContext | undefined {
    try {
      return JSON.parse(readFileSync(this.file(taskId), 'utf-8'));
    } catch {
      return undefined;
    }
  }

  private file(taskId: string) {
    return join(this.root, 'tasks', taskId, 'context.json');
  }
}
