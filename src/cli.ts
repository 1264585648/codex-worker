#!/usr/bin/env node
import { Command } from 'commander';
import { addTask, listTasks, queueTask } from './storage.js';
import { createWorkerRuntime } from './application/worker-service.js';

const program = new Command();

program
  .name('codex-worker')
  .description('Persistent task runner for Codex CLI');

const task = program.command('task').description('Manage tasks');

task
  .command('create')
  .requiredOption('-n, --name <name>')
  .requiredOption('-w, --workspace <path>')
  .requiredOption('-p, --prompt <prompt>')
  .action((opts) => {
    console.log(addTask(opts));
  });

task
  .command('queue <id>')
  .description('Queue a created task')
  .action((id) => {
    console.log(queueTask(id));
  });

task
  .command('list')
  .action(() => {
    console.table(listTasks());
  });

const worker = program.command('worker').description('Manage worker runtime');

worker
  .command('start')
  .description('Start worker runtime')
  .action(async () => {
    console.log('Starting Codex Worker runtime...');
    const runtime = createWorkerRuntime();
    await runtime.start();
  });

program
  .command('status')
  .description('Show worker status')
  .action(() => {
    console.log('Codex Worker status: ready');
  });

program.parse();
