import { execa } from 'execa';
import type { Task } from '../types.js';

export class CodexExecutor {
  constructor(private readonly command = 'codex') {}

  async execute(task: Task): Promise<{ output?: string; error?: string }> {
    try {
      const args = ['exec'];

      if (task.codexSessionId) {
        args.push('--resume', task.codexSessionId);
      }

      args.push(task.prompt);

      const result = await execa(this.command, args, {
        cwd: task.workspace,
      });

      return { output: result.stdout };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
