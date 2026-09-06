export interface TaskContext {
  taskId: string;
  workspace: string;
  completed: string[];
  changedFiles: string[];
  nextStep?: string;
  lastOutput?: string;
  updatedAt: number;
}
