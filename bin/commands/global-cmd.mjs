import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { getOpenCodeHome, globalInstallExists } from './global-path.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = join(__dirname, '..', '..');
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

/**
 * opencode-agent-kit global <subcommand>
 *
 * Subcommands:
 *   path      — Print global install path
 *   update    — Re-install the latest version globally
 *   status    — Show global install info and version
 */
export async function globalCmd(subcommand, _options) {
  switch (subcommand) {
    case 'path':
      cmdPath();
      break;
    case 'update':
      await cmdUpdate();
      break;
    case 'status':
      await cmdStatus();
      break;
    default:
      await cmdStatus();
      break;
  }
}

function cmdPath() {
  const home = getOpenCodeHome();
  console.log(home);
}

async function cmdStatus() {
  console.log(`\n  ${C.bold}${PKG_NAME} global status${C.reset}`);
  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);

  const opencodeHome = getOpenCodeHome();

  console.log(`  ${C.bold}Home:${C.reset}   ${opencodeHome}`);

  if (!globalInstallExists()) {
    console.log(`  ${C.yellow}Status:  Not installed${C.reset}`);
    console.log(`\n  Run: ${C.cyan}opencode-agent-kit init --global${C.reset}\n`);
    return;
  }

  // Read version
  const versionPath = join(opencodeHome, '.kit-version');
  let installedVersion = 'unknown';
  if (existsSync(versionPath)) {
    installedVersion = readFileSync(versionPath, 'utf-8').trim();
  }

  // Check latest from npm
  let latestVersion;
  try {
    latestVersion = execSync(`npm view ${PKG_NAME} version`, {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
  } catch {
    latestVersion = 'check failed (offline?)';
  }

  const uptodate =
    installedVersion === latestVersion || latestVersion === 'check failed (offline?)';
  console.log(
    `  ${C.bold}Version:${C.reset} ${installedVersion} ${uptodate ? '(up to date)' : `(latest: ${latestVersion})`}`,
  );

  // Kit contents
  if (existsSync(opencodeHome)) {
    const skillsDir = join(opencodeHome, 'skills');
    const agentsDir = join(opencodeHome, 'prompts', 'agents');
    const commandsDir = join(opencodeHome, 'commands');
    const skills = existsSync(skillsDir) ? readdirSync(skillsDir).length : 0;
    const agents = existsSync(agentsDir)
      ? readdirSync(agentsDir).filter((f) => f.endsWith('.md')).length
      : 0;
    const commands = existsSync(commandsDir)
      ? readdirSync(commandsDir).filter((f) => f.endsWith('.md')).length
      : 0;
    console.log(
      `  ${C.bold}Size:${C.reset}    ${skills} skills · ${agents} agents · ${commands} commands`,
    );
  }

  console.log(
    `  ${C.green}✓${C.reset} Global install: ${existsSync(join(opencodeHome, 'opencode.jsonc')) ? 'OK' : 'INCOMPLETE'}`,
  );
  console.log();
}

async function cmdUpdate() {
  console.log(`\n  ${C.bold}${PKG_NAME} global update${C.reset}`);
  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);

  if (!globalInstallExists()) {
    error('No global install found.');
    info('Run `opencode-agent-kit init --global` to install first.');
    process.exit(1);
  }

  // Check latest version
  info('Checking latest version...');
  let latestVersion;
  try {
    latestVersion = execSync(`npm view ${PKG_NAME} version`, {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
  } catch {
    error('Could not reach npm registry. Are you offline?');
    process.exit(1);
  }

  const pkgJson = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf-8'));
  const currentVersion = pkgJson.version;

  if (currentVersion === latestVersion) {
    success(`Already at latest version v${currentVersion}`);
    return;
  }

  console.log(`  Current: v${currentVersion} → Latest: v${latestVersion}`);

  // Re-run the global install (re-copy template)
  info('Updating global install...');
  const { init } = await import('./init.mjs');
  await init({ global: true, force: true, skipInstall: false, dir: process.cwd() });

  success(`Global install updated to v${latestVersion}`);
}
