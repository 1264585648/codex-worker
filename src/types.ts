export type TaskStatus =
  | 'CREATED'
  | 'QUEUED'
  | 'RUNNING'
  | 'WAITING_QUOTA'
  | 'COMPLETED'
  | 'FAILED';

export interface Task {
  id: string;
  name: string;
  workspace: string;
  prompt: string;
  status: TaskStatus;
  codexSessionId?: string;
  lastOutput?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
}
