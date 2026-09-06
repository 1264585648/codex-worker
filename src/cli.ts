#!/usr/bin/env node
import { Command } from 'commander';
import { addTask, listTasks } from './storage.js';

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
  .command('list')
  .action(() => {
    console.table(listTasks());
  });

program
  .command('worker')
  .command('start')
  .description('Start worker daemon');

program
  .command('status')
  .description('Show worker status')
  .action(() => {
    console.log('Codex Worker status: ready');
  });

program.parse();
