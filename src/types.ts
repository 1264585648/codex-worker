export type TaskStatus =
  | 'WAITING'
  | 'RUNNING'
  | 'DONE'
  | 'FAILED';

export interface Task {
  id: string;
  name: string;
  workspace: string;
  prompt: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
