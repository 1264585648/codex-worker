import { execa } from 'execa';
import { Task } from '../core/types';

export class CodexExecutor {
  constructor(private readonly command = 'codex') {}

  async execute(task: Task): Promise<{ output?: string; error?: string }> {
    try {
      const result = await execa(this.command, [
        'exec',
        task.prompt,
      ], {
        cwd: task.workspace,
      });

      return {
        output: result.stdout,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
