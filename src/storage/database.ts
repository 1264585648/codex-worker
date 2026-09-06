import Database from 'better-sqlite3';

export class WorkerDatabase {
  private readonly db: Database.Database;

  constructor(path = '.codex-worker.sqlite') {
    this.db = new Database(path);
    this.migrate();
  }

  get connection() {
    return this.db;
  }

  private migrate() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        workspace TEXT NOT NULL,
        prompt TEXT NOT NULL,
        status TEXT NOT NULL,
        strategy TEXT NOT NULL DEFAULT 'immediate',
        priority INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS runs (
        id TEXT PRIMARY KEY,
        task_id TEXT NOT NULL,
        status TEXT NOT NULL,
        output TEXT,
        error TEXT,
        started_at INTEGER NOT NULL,
        finished_at INTEGER
      );

      CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        task_id TEXT,
        type TEXT NOT NULL,
        payload TEXT,
        created_at INTEGER NOT NULL
      );
    `);
  }
}
