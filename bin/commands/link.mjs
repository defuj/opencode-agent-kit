import { existsSync } from 'fs';
import { getOpenCodeHome, globalInstallExists } from './global-path.mjs';
import { platform } from 'os';

const PKG_NAME = 'opencode-agent-kit';

const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function info(msg) {
  console.log(`  ${C.cyan}→${C.reset} ${msg}`);
}
function success(msg) {
  console.log(`  ${C.green}✓${C.reset} ${msg}`);
}
function error(msg) {
  console.log(`  ${C.red}✗${C.reset} ${msg}`);
}

export async function linkProject(options) {
  const targetDir = options.dir || process.cwd();
  const force = options.force;

  console.log(`\n  ${C.bold}${PKG_NAME} link${C.reset}`);
  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);
  console.log(`  Target: ${targetDir}\n`);

  if (!existsSync(targetDir)) {
    error(`Target directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  if (!globalInstallExists()) {
    error('No global install found.');
    info('Run `opencode-agent-kit init --global` first.');
    process.exit(1);
  }

  const opencodeHome = getOpenCodeHome();

  // On macOS/Linux: OpenCode auto-detects ~/.config/opencode/
  if (platform() !== 'win32') {
    info('OpenCode on this platform auto-detects the global config.');
    info(`Global config: ${opencodeHome}`);
    success('No per-project setup needed — OpenCode reads global config automatically.');
    console.log(`\n  ${C.bold}${C.green}→${C.reset} Run ${C.cyan}opencode${C.reset} to start.\n`);
    return;
  }

  // Windows: delegate to init.mjs linkProject
  const { linkProject: doLink } = await import('./init.mjs');
  await doLink(targetDir, opencodeHome, force);
}
