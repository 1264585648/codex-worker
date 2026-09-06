export type TaskStatus =
  | 'CREATED'
  | 'QUEUED'
  | 'RUNNING'
  | 'WAITING_QUOTA'
  | 'COMPLETED'
  | 'FAILED';

export type TaskStrategy = 'immediate' | 'wait-quota';

export interface Task {
  id: string;
  name: string;
  workspace: string;
  prompt: string;
  status: TaskStatus;
  strategy: TaskStrategy;
  createdAt: number;
  updatedAt: number;
}

export interface Run {
  id: string;
  taskId: string;
  status: string;
  startedAt: number;
  finishedAt?: number;
  output?: string;
  error?: string;
}

export interface WorkerEvent {
  id: string;
  taskId: string;
  type: string;
  payload: string;
  createdAt: number;
}
