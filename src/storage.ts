import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import type { Task, TaskStatus } from './types.js';

const db = new Database('codex-worker.db');

db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 workspace TEXT NOT NULL,
 prompt TEXT NOT NULL,
 status TEXT NOT NULL,
 codex_session_id TEXT,
 last_output TEXT,
 error TEXT,
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
`);

function normalize(row: any): Task {
 return {
  id: row.id,
  name: row.name,
  workspace: row.workspace,
  prompt: row.prompt,
  status: row.status,
  codexSessionId: row.codex_session_id ?? undefined,
  lastOutput: row.last_output ?? undefined,
  error: row.error ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
 };
}

export function addTask(input: Omit<Task, 'id'|'status'|'createdAt'|'updatedAt'>) {
 const now = new Date().toISOString();
 const task = { ...input, id: randomUUID(), status: 'CREATED' as TaskStatus, createdAt: now, updatedAt: now };
 db.prepare(`INSERT INTO tasks(id,name,workspace,prompt,status,codex_session_id,last_output,error,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?)`)
  .run(task.id, task.name, task.workspace, task.prompt, task.status, null, null, null, now, now);
 return task;
}

export function queueTask(id: string) {
 return updateTaskStatus(id, 'QUEUED');
}

export function updateTaskStatus(id: string, status: TaskStatus) {
 const updatedAt = new Date().toISOString();
 db.prepare('UPDATE tasks SET status=?,updated_at=? WHERE id=?').run(status, updatedAt, id);
 return getTask(id);
}

export function saveExecution(id: string, output: string, error?: string) {
 db.prepare('UPDATE tasks SET last_output=?,error=?,updated_at=? WHERE id=?')
  .run(output, error ?? null, new Date().toISOString(), id);
 return getTask(id);
}

export function getTask(id: string): Task | undefined {
 const row = db.prepare('SELECT * FROM tasks WHERE id=?').get(id);
 return row ? normalize(row) : undefined;
}

export function listTasks(): Task[] {
 return (db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all() as any[]).map(normalize);
}
