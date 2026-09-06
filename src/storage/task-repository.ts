import { randomUUID } from 'node:crypto';
import { WorkerDatabase } from './database';

export type TaskStatus = 'CREATED' | 'QUEUED' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'WAITING_QUOTA';

export interface TaskRecord {
  id: string;
  name: string;
  workspace: string;
  prompt: string;
  status: TaskStatus;
  strategy: string;
  priority: number;
}

export class TaskRepository {
  constructor(private readonly database: WorkerDatabase) {}

  create(input: Omit<TaskRecord, 'id' | 'status'>) {
    const now = Date.now();
    const task: TaskRecord = {
      ...input,
      id: randomUUID(),
      status: 'QUEUED'
    };

    this.database.connection.prepare(`
      INSERT INTO tasks(id,name,workspace,prompt,status,strategy,priority,created_at,updated_at)
      VALUES(@id,@name,@workspace,@prompt,@status,@strategy,@priority,@createdAt,@updatedAt)
    `).run({ ...task, createdAt: now, updatedAt: now });

    return task;
  }

  nextQueued() {
    return this.database.connection.prepare(
      "SELECT * FROM tasks WHERE status='QUEUED' ORDER BY priority DESC, created_at ASC LIMIT 1"
    ).get() as TaskRecord | undefined;
  }

  updateStatus(id: string, status: TaskStatus) {
    this.database.connection.prepare(
      'UPDATE tasks SET status=?, updated_at=? WHERE id=?'
    ).run(status, Date.now(), id);
  }

  list() {
    return this.database.connection.prepare(
      'SELECT * FROM tasks ORDER BY created_at DESC'
    ).all();
  }
}
