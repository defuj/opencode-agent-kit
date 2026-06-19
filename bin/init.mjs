#!/usr/bin/env node

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Command } from 'commander';
import { init } from './commands/init.mjs';
import { upgrade } from './commands/upgrade.mjs';
import { doctor } from './commands/doctor.mjs';
import { uninstall } from './commands/uninstall.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = join(__dirname, '..');
const PKG_VERSION = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf-8')).version;

const program = new Command();

program
  .name('opencode-agent-kit')
  .description(
    'Multi-stack OpenCode agent toolkit — 31+ specialized AI agents, 200+ skills, 46 commands',
  )
  .version(PKG_VERSION);

program
  .command('init')
  .description('Initialize .opencode/ configuration in current project')
  .option('-f, --force', 'Overwrite existing files without prompt')
  .option('-d, --dir <path>', 'Target project directory', process.cwd())
  .option('--skip-install', 'Skip npm/bun install step in .opencode/')
  .action(init);

program
  .command('upgrade')
  .description('Check for and apply the latest version of opencode-agent-kit')
  .option('-v, --verbose', 'Show detailed upgrade output')
  .action(upgrade);

program
  .command('doctor')
  .description('Diagnose common setup issues in the target project')
  .option('-d, --dir <path>', 'Target project directory', process.cwd())
  .option('--fix', 'Show actionable fix suggestions')
  .action(doctor);

program
  .command('uninstall')
  .description('Remove opencode-agent-kit configuration from the target project')
  .option('-d, --dir <path>', 'Target project directory', process.cwd())
  .option('-f, --force', 'Skip confirmation prompt')
  .action(uninstall);

program.parse();
