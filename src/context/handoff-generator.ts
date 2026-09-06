import type { TaskContext } from './types.js';

export function generateHandoff(context: TaskContext) {
  return `# Codex Worker Handoff\n\nProject:\n${context.workspace}\n\nCompleted:\n${context.completed.map(item => `- ${item}`).join('\n')}\n\nChanged Files:\n${context.changedFiles.map(item => `- ${item}`).join('\n')}\n\nNext Step:\n${context.nextStep ?? 'Continue current task'}\n`;
}
