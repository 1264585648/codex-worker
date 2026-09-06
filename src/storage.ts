import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import type { Task } from './types.js';

const db = new Database('codex-worker.db');

db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 workspace TEXT NOT NULL,
 prompt TEXT NOT NULL,
 status TEXT NOT NULL,
 created_at TEXT NOT NULL,
 updated_at TEXT NOT NULL
);
`);

export function addTask(input: Omit<Task, 'id'|'status'|'createdAt'|'updatedAt'>) {
 const now = new Date().toISOString();
 const task = { ...input, id: randomUUID(), status: 'WAITING', createdAt: now, updatedAt: now };
 db.prepare(`INSERT INTO tasks VALUES (?,?,?,?,?,?,?)`).run(
  task.id, task.name, task.workspace, task.prompt, task.status, task.createdAt, task.updatedAt
 );
 return task;
}

export function listTasks(): Task[] {
 return db.prepare('SELECT id,name,workspace,prompt,status,created_at as createdAt,updated_at as updatedAt FROM tasks ORDER BY created_at DESC').all() as Task[];
}
