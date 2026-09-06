import { execa } from 'execa';

export interface ExecutionResult {
  output: string;
  exitCode: number;
}

export async function runCodex(workspace: string, prompt: string): Promise<ExecutionResult> {
  const result = await execa('codex', ['exec', '--cwd', workspace, prompt], {
    reject: false,
  });

  return {
    output: `${result.stdout}\n${result.stderr}`,
    exitCode: result.exitCode,
  };
}
