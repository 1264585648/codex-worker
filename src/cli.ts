#!/usr/bin/env node
import { Command } from 'commander';
import { addTask, listTasks } from './storage.js';

const program = new Command();

program
 .name('codex-worker')
 .description('Persistent task runner for Codex CLI');

program.command('task:add')
 .requiredOption('-n, --name <name>')
 .requiredOption('-w, --workspace <path>')
 .requiredOption('-p, --prompt <prompt>')
 .action((opts) => {
   console.log(addTask(opts));
 });

program.command('task:list')
 .action(() => {
   console.table(listTasks());
 });

program.parse();
