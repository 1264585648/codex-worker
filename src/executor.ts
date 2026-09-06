import { execa } from 'execa';

export interface ExecutionResult {
  output: string;
  exitCode: number;
}

export async function runCodex(workspace: string, prompt: string, sessionId?: string): Promise<ExecutionResult> {
  const args = ['exec', '--cwd', workspace];

  if (sessionId) {
    args.push('--resume', sessionId);
  }

  args.push(prompt);

  const result = await execa('codex', args, {
    reject: false,
  });

  return {
    output: `${result.stdout}\n${result.stderr}`,
    exitCode: result.exitCode,
  };
}
