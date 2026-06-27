import {
  readFileSync,
  existsSync,
  copyFileSync,
  mkdirSync,
  writeFileSync,
  readdirSync,
  appendFileSync,
  symlinkSync,
  rmSync,
} from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { platform } from 'os';
import { getOpenCodeHome } from './global-path.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = join(__dirname, '..', '..');
const TEMPLATE_DIR = join(PKG_ROOT, 'template');
const PKG_NAME = 'opencode-agent-kit';

// ANSI colors
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
function warn(msg) {
  console.log(`  ${C.yellow}⚠${C.reset} ${msg}`);
}
function error(msg) {
  console.log(`  ${C.red}✗${C.reset} ${msg}`);
}

function copyRecursive(src, dest) {
  if (!existsSync(src)) return;
  const entries = readdirSync(src, { withFileTypes: true });
  mkdirSync(dest, { recursive: true });
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    if (entry.name === 'node_modules') continue;
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

function detectPackageManager(cwd) {
  if (existsSync(join(cwd, 'bun.lock'))) return 'bun';
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn';
  return 'npm';
}

/**
 * Strip comments from JSONC text and parse as JSON.
 * Handles // single-line and /* block comments.
 */
function parseJsonc(text) {
  // Strip // comments
  let cleaned = text.replace(/\/\/.*$/gm, '');
  // Strip /* */ comments
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  // Strip trailing commas
  cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
  return JSON.parse(cleaned);
}

function mergeJson(target, source, strategy = {}) {
  const merged = JSON.parse(JSON.stringify(target));

  for (const [key, value] of Object.entries(source)) {
    if (!(key in merged)) {
      merged[key] = JSON.parse(JSON.stringify(value));
      continue;
    }

    const rule = strategy[key] || 'default';

    if (rule === 'keep-target') continue;
    if (rule === 'source-wins') {
      merged[key] = JSON.parse(JSON.stringify(value));
      continue;
    }

    if (rule === 'merge-agents') {
      merged[key] = merged[key] || {};
      for (const [agentKey, agentVal] of Object.entries(value)) {
        if (!(agentKey in merged[key])) {
          merged[key][agentKey] = JSON.parse(JSON.stringify(agentVal));
        }
      }
      continue;
    }

    if (rule === 'merge-mcp') {
      merged[key] = merged[key] || {};
      for (const [mcpKey, mcpVal] of Object.entries(value)) {
        if (!(mcpKey in merged[key])) {
          merged[key][mcpKey] = JSON.parse(JSON.stringify(mcpVal));
        }
      }
      continue;
    }

    if (rule === 'merge-instructions') {
      const existing = merged[key] || [];
      const srcArr = Array.isArray(value) ? value : [value];
      for (const item of srcArr) {
        if (!existing.includes(item)) {
          existing.push(item);
        }
      }
      merged[key] = existing;
      continue;
    }

    if (rule === 'merge-permissions') {
      merged[key] = merged[key] || {};
      for (const [permKey, permVal] of Object.entries(value)) {
        if (!(permKey in merged[key])) {
          merged[key][permKey] = JSON.parse(JSON.stringify(permVal));
        }
      }
      continue;
    }

    // default: source wins for top-level, merge nested objects
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value) &&
      typeof merged[key] === 'object' &&
      merged[key] !== null &&
      !Array.isArray(merged[key])
    ) {
      merged[key] = { ...merged[key], ...value };
    } else {
      merged[key] = value;
    }
  }

  return merged;
}

/**
 * Strip the `.opencode/` prefix from a path.
 * Used when installing globally: files from `.opencode/skills/...`
 * go directly to `skills/...` in the global dir.
 */
function stripDotOpencode(path) {
  if (path.startsWith('.opencode/')) {
    return path.slice('.opencode/'.length);
  }
  return path;
}

/**
 * Rewrite template opencode.json paths for global install:
 *   .opencode/skills/...  →  skills/...
 *   .opencode/instructions/...  →  instructions/...
 *   .opencode/prompts/agents/...  →  prompts/agents/...
 */
function rewriteTemplatePathsForGlobal(config) {
  const rewritten = JSON.parse(JSON.stringify(config));

  // Rewrite instructions
  if (Array.isArray(rewritten.instructions)) {
    rewritten.instructions = rewritten.instructions.map((p) => stripDotOpencode(p));
  }

  // Rewrite agent prompt file paths
  if (rewritten.agent) {
    for (const [, agentConfig] of Object.entries(rewritten.agent)) {
      if (agentConfig.file) {
        agentConfig.file = stripDotOpencode(agentConfig.file);
      }
    }
  }

  return rewritten;
}

/**
 * Install the kit globally into the OpenCode config directory.
 *
 * On macOS/Linux: ~/.config/opencode/
 * On Windows: %APPDATA%\opencode\
 *
 * Files from template/.opencode/ are copied FLAT (no .opencode wrapper),
 * and config paths are adjusted accordingly.
 */
async function installGlobal(options) {
  const opencodeHome = getOpenCodeHome();

  console.log(`\n  ${C.bold}${PKG_NAME} init --global${C.reset}`);
  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);

  // 1. Validate template
  if (!existsSync(TEMPLATE_DIR)) {
    error(`Template directory not found at ${TEMPLATE_DIR}`);
    error('This is a bug. Please reinstall the package.');
    process.exit(1);
  }

  // 2. Check if already installed
  const jsoncPath = join(opencodeHome, 'opencode.jsonc');
  const jsonPath = join(opencodeHome, 'opencode.json');
  if ((existsSync(jsoncPath) || existsSync(jsonPath)) && !options.force) {
    warn(`OpenCode config already exists at ${opencodeHome}`);
    const rl = await import('readline/promises');
    const readline = rl.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await readline.question(`  ? Merge agent kit into existing config? [y/N] `);
    readline.close();
    if (answer.toLowerCase() !== 'y') {
      error('Aborted.');
      process.exit(0);
    }
  }

  // 3. Ensure global directory exists
  info(`OpenCode home: ${opencodeHome}`);
  mkdirSync(opencodeHome, { recursive: true });

  // 4. Copy template/.opencode/ contents FLAT into opencodeHome
  //    e.g. template/.opencode/skills/ → opencodeHome/skills/
  info('Copying skills, prompts, commands, instructions...');
  const templateOpencode = join(TEMPLATE_DIR, '.opencode');
  const entries = readdirSync(templateOpencode, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    if (entry.name === 'node_modules') continue;
    if (entry.name === 'package.json') continue; // preserve existing
    const srcPath = join(templateOpencode, entry.name);
    const destPath = join(opencodeHome, entry.name);
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else if (!existsSync(destPath)) {
      copyFileSync(srcPath, destPath);
    }
  }

  // 5. Copy template's package.json if user doesn't have one
  const tmplPkgJson = join(templateOpencode, 'package.json');
  const userPkgJson = join(opencodeHome, 'package.json');
  if (!existsSync(userPkgJson)) {
    copyFileSync(tmplPkgJson, userPkgJson);
  }

  // 6. Merge config into opencode.jsonc (or opencode.json)
  const templateConfigPath = join(TEMPLATE_DIR, 'opencode.json');
  const templateConfig = JSON.parse(readFileSync(templateConfigPath, 'utf-8'));

  // Rewrite paths for flat structure
  const kitConfig = rewriteTemplatePathsForGlobal(templateConfig);

  // Read existing user config (JSONC or JSON)
  let userConfig = {};
  if (existsSync(jsoncPath)) {
    try {
      const raw = readFileSync(jsoncPath, 'utf-8');
      userConfig = parseJsonc(raw);
    } catch (err) {
      warn(`Could not parse existing opencode.jsonc: ${err.message}`);
      warn('Will create fresh config entries.');
    }
  } else if (existsSync(jsonPath)) {
    try {
      userConfig = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    } catch {
      warn('Could not parse existing opencode.json.');
    }
  }

  // Build merge strategy
  const strategy = {
    $schema: 'keep-target',
    formatter: 'keep-target',
    permission: 'keep-target',
    provider: 'keep-target',
    plugin: 'merge-instructions',
    instructions: 'merge-instructions',
    agent: options.force ? 'source-wins' : 'merge-agents',
    mcp: 'merge-mcp',
  };

  const merged = mergeJson(userConfig, kitConfig, strategy);

  // Write as .jsonc (JSON without comments — OpenCode reads both)
  info('Merging configuration into opencode.jsonc...');
  writeFileSync(jsoncPath, JSON.stringify(merged, null, 2) + '\n', 'utf-8');

  // 7. Copy opencode.example.json
  const exampleSrc = join(TEMPLATE_DIR, 'opencode.example.json');
  const exampleDest = join(opencodeHome, 'opencode.example.json');
  if (existsSync(exampleSrc) && !existsSync(exampleDest)) {
    copyFileSync(exampleSrc, exampleDest);
  }

  // 8. Install dependencies
  info('Installing OpenCode dependencies...');
  let pm;
  try {
    pm = detectPackageManager(opencodeHome);
    execSync(`${pm} install`, { cwd: opencodeHome, stdio: 'pipe' });
    success('Dependencies installed');
  } catch (err) {
    warn(`Dependency install failed: ${err.message}`);
    warn(`You can run "${pm} install" manually in ${opencodeHome}`);
  }

  // 9. Install agentmemory globally
  info('Setting up agentmemory (persistent memory)...');
  try {
    execSync('agentmemory --version', { stdio: 'pipe' });
    success('agentmemory already installed');
  } catch {
    try {
      execSync('npm install -g @agentmemory/agentmemory', { stdio: 'pipe', timeout: 60000 });
      success('agentmemory installed globally');
    } catch (err) {
      warn(`agentmemory global install failed: ${err.message}`);
      warn('Run "npm install -g @agentmemory/agentmemory" manually');
    }
  }

  // 10. Install portless globally
  info('Setting up portless (dev server URLs)...');
  try {
    execSync('portless --version', { stdio: 'pipe' });
    success('portless already installed');
  } catch {
    try {
      execSync('npm install -g portless', { stdio: 'pipe', timeout: 60000 });
      success('portless installed globally');
    } catch (err) {
      warn(`portless global install failed: ${err.message}`);
      warn('Run "npm install -g portless" manually');
    }
  }

  // 11. Write version
  const pkgJson = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf-8'));
  writeFileSync(join(opencodeHome, '.kit-version'), pkgJson.version + '\n', 'utf-8');

  // 12. Summary
  console.log(
    `\n  ${C.bold}${C.green}✅ opencode-agent-kit v${pkgJson.version} installed globally!${C.reset}\n`,
  );
  console.log(`  ${C.dim}Location:${C.reset} ${opencodeHome}`);
  console.log(`  ${C.dim}${'─'.repeat(30)}${C.reset}`);
  console.log(`  ${C.bold}Installed:${C.reset}`);
  console.log(`    • ${C.cyan}skills/${C.reset}              — 200+ skill playbooks`);
  console.log(`    • ${C.cyan}prompts/agents/${C.reset}      — 34 agent prompt files`);
  console.log(`    • ${C.cyan}commands/${C.reset}            — 47 slash commands`);
  console.log(`    • ${C.cyan}instructions/${C.reset}        — Core rules`);
  console.log(`    • ${C.cyan}hooks/${C.reset}               — Automation hooks`);
  console.log(`    • ${C.cyan}rules/${C.reset}               — Scoped coding rules`);
  console.log(`    • ${C.cyan}opencode.jsonc${C.reset}       — Merged configuration`);
  console.log(`    • ${C.cyan}agentmemory${C.reset} (global) — Persistent memory`);
  console.log(`    • ${C.cyan}portless${C.reset} (global)    — Dev server URLs`);
  console.log(`\n  ${C.bold}${C.green}→${C.reset} OpenCode will automatically use this config.\n`);
}

/**
 * Link: on macOS/Linux, the global config at ~/.config/opencode/ is
 * automatically detected by OpenCode. No per-project setup needed.
 *
 * On other platforms, creates a minimal per-project config.
 */
export async function linkProject(targetDir, _opencodeHome, force) {
  // On macOS/Linux: OpenCode auto-detects ~/.config/opencode/
  if (platform() !== 'win32') {
    console.log(`\n  ${C.bold}${PKG_NAME} link${C.reset}`);
    console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);
    console.log(`  Target: ${targetDir}\n`);

    info('OpenCode on this platform auto-detects the global config.');
    info(`Global config at: ${getOpenCodeHome()}`);
    success('No per-project setup needed — OpenCode reads global config automatically.');

    console.log(`\n  ${C.bold}${C.green}→${C.reset} Run ${C.cyan}opencode${C.reset} to start.\n`);
    return;
  }

  // Windows: create a reference config
  console.log(`\n  ${C.bold}${PKG_NAME} link${C.reset}`);
  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);
  console.log(`  Target: ${targetDir}\n`);

  const opencodeHome = _opencodeHome || getOpenCodeHome();
  const opencodeDir = join(targetDir, '.opencode');

  if ((existsSync(opencodeDir) || existsSync(join(targetDir, 'opencode.json'))) && !force) {
    warn(`Configuration already exists in ${targetDir}`);
    const rl = await import('readline/promises');
    const readline = rl.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await readline.question(`  ? Overwrite? [y/N] `);
    readline.close();
    if (answer.toLowerCase() !== 'y') {
      error('Aborted.');
      process.exit(0);
    }
  }

  // Symlink .opencode/ → global opencodeHome
  if (existsSync(opencodeDir)) {
    rmSync(opencodeDir, { recursive: true, force: true });
  }
  symlinkSync(opencodeHome, opencodeDir, 'junction');

  // Minimal opencode.json that references global install
  const configPath = join(targetDir, 'opencode.json');
  const refConfig = {
    $schema: 'https://opencode.ai/config.json',
    instructions: [join(opencodeHome, 'instructions', 'INSTRUCTIONS.md')],
  };
  writeFileSync(configPath, JSON.stringify(refConfig, null, 2) + '\n', 'utf-8');

  // .gitignore
  const gitignorePath = join(targetDir, '.gitignore');
  const gitignoreEntries = ['.opencode/*', 'opencode.json'];
  if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, gitignoreEntries.join('\n') + '\n', 'utf-8');
  } else {
    const gitignoreContent = readFileSync(gitignorePath, 'utf-8');
    for (const entry of gitignoreEntries) {
      if (!gitignoreContent.includes(entry)) {
        appendFileSync(gitignorePath, entry + '\n', 'utf-8');
      }
    }
  }

  success(`.opencode/ → junction to global install`);
  success('opencode.json created');
  console.log(`\n  ${C.bold}${C.green}✅ Project linked!\n`);
}

/**
 * Local init: copy template into project directory (traditional behaviour).
 */
async function initLocal(options) {
  const targetDir = options.dir;
  const force = options.force;
  const skipInstall = options.skipInstall;

  if (!existsSync(targetDir)) {
    error(`Target directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  const opencodeDir = join(targetDir, '.opencode');
  const userConfigPath = join(targetDir, 'opencode.json');

  if (existsSync(opencodeDir) && !force) {
    warn(`.opencode/ already exists in ${targetDir}`);
    const rl = await import('readline/promises');
    const readline = rl.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await readline.question(`  ? Overwrite existing files? [y/N] `);
    readline.close();
    if (answer.toLowerCase() !== 'y') {
      error('Aborted.');
      process.exit(0);
    }
  }

  if (!existsSync(TEMPLATE_DIR)) {
    error(`Template directory not found at ${TEMPLATE_DIR}`);
    error('This is a bug. Please reinstall the package.');
    process.exit(1);
  }

  info('Copying .opencode/ configuration...');
  copyRecursive(join(TEMPLATE_DIR, '.opencode'), opencodeDir);

  const templateConfigPath = join(TEMPLATE_DIR, 'opencode.json');
  if (existsSync(templateConfigPath)) {
    info('Merging opencode.json...');
    const templateConfig = JSON.parse(readFileSync(templateConfigPath, 'utf-8'));
    const userConfig = existsSync(userConfigPath)
      ? JSON.parse(readFileSync(userConfigPath, 'utf-8'))
      : {};
    const strategy = {
      $schema: 'source-wins',
      formatter: 'keep-target',
      permission: 'keep-target',
      instructions: 'merge-instructions',
      mcp: 'merge-mcp',
      agent: force ? 'source-wins' : 'merge-agents',
      plugin: 'merge-instructions',
    };
    const merged = mergeJson(userConfig, templateConfig, strategy);
    writeFileSync(userConfigPath, JSON.stringify(merged, null, 2) + '\n', 'utf-8');
  }

  const exampleSrc = join(TEMPLATE_DIR, 'opencode.example.json');
  const exampleDest = join(targetDir, 'opencode.example.json');
  if (existsSync(exampleSrc)) {
    copyFileSync(exampleSrc, exampleDest);
    info('opencode.example.json copied');
  }

  if (!skipInstall) {
    const pm = detectPackageManager(opencodeDir);
    info(`Installing .opencode/ dependencies with ${pm}...`);
    try {
      execSync(`${pm} install`, { cwd: opencodeDir, stdio: 'pipe' });
      success('.opencode/ dependencies installed');
    } catch (err) {
      warn(`Dependency install failed: ${err.message}`);
      warn(`You can run "${pm} install" manually in .opencode/`);
    }
  }

  if (!skipInstall) {
    info('Setting up agentmemory...');
    try {
      execSync('agentmemory --version', { stdio: 'pipe' });
      success('agentmemory already installed');
    } catch {
      try {
        execSync('npm install -g @agentmemory/agentmemory', { stdio: 'pipe', timeout: 60000 });
        success('agentmemory installed globally');
      } catch (err) {
        warn(`agentmemory global install failed: ${err.message}`);
        warn('Run "npm install -g @agentmemory/agentmemory" manually');
      }
    }
  }

  if (!skipInstall) {
    info('Setting up portless...');
    try {
      execSync('portless --version', { stdio: 'pipe' });
      success('portless already installed');
    } catch {
      try {
        execSync('npm install -g portless', { stdio: 'pipe', timeout: 60000 });
        success('portless installed globally');
      } catch (err) {
        warn(`portless global install failed: ${err.message}`);
        warn('Run "npm install -g portless" manually');
      }
    }
  }

  const gitignorePath = join(targetDir, '.gitignore');
  const gitignoreEntries = ['.opencode/*', 'opencode.json', 'opencode.example.json', 'data/'];
  if (!existsSync(gitignorePath)) {
    writeFileSync(gitignorePath, gitignoreEntries.join('\n') + '\n', 'utf-8');
    success('Created .gitignore');
  } else {
    const gitignoreContent = readFileSync(gitignorePath, 'utf-8');
    let appended = false;
    for (const entry of gitignoreEntries) {
      if (!gitignoreContent.includes(entry)) {
        appendFileSync(gitignorePath, entry + '\n', 'utf-8');
        appended = true;
      }
    }
    if (appended) success('Updated .gitignore');
  }

  const pkgJson = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf-8'));
  writeFileSync(join(opencodeDir, '.kit-version'), pkgJson.version + '\n', 'utf-8');

  if (existsSync(opencodeDir) && existsSync(join(opencodeDir, '.kit-version'))) {
    const { runMigrations } = await import('./migrate.mjs');
    const existingConfig = existsSync(userConfigPath)
      ? JSON.parse(readFileSync(userConfigPath, 'utf-8'))
      : {};
    const result = await runMigrations(targetDir, existingConfig, { verbose: false });
    if (result.ran > 0) info(`Applied ${result.ran} migration(s).`);
  }

  console.log(
    `\n  ${C.bold}${C.green}✅ opencode-agent-kit v${pkgJson.version} installed!${C.reset}\n`,
  );
  console.log(`  ${C.dim}Location:${C.reset} ${targetDir}`);
  console.log(`  ${C.dim}${'─'.repeat(30)}${C.reset}`);
  console.log(`  ${C.bold}What you got:${C.reset}`);
  console.log(`    • ${C.cyan}opencode.json${C.reset}          — 33 agents + 10 MCP servers`);
  console.log(`    • ${C.cyan}.opencode/prompts/agents/${C.reset}      — 34 agent prompt files`);
  console.log(`    • ${C.cyan}.opencode/skills/${C.reset}      — 200+ skill playbooks`);
  console.log(`    • ${C.cyan}.opencode/commands/${C.reset}    — 47 slash commands`);
  console.log(`    • ${C.cyan}.opencode/rules/${C.reset}       — Scoped coding rules`);
  console.log(`    • ${C.cyan}.opencode/hooks/${C.reset}       — Automation hooks`);
  console.log(`    • ${C.cyan}.opencode/docs/${C.reset}        — Agent documentation`);
  console.log(`    • ${C.cyan}agentmemory${C.reset} (global)  — Persistent memory`);
  console.log(
    `    • ${C.cyan}portless${C.reset} (global)    — Named .localhost URLs for dev servers`,
  );
  console.log(
    `\n  ${C.bold}${C.green}→${C.reset} Next: run ${C.cyan}opencode${C.reset} to start\n`,
  );
}

/**
 * Main init entry point.
 * Dispatches to:
 *   --global  →  installGlobal()
 *   --local   →  initLocal()
 *   default   →  check global, then choose initLocal() (per-project)
 */
export async function init(options) {
  if (options.global) return installGlobal(options);
  if (options.local) return initLocal(options);

  const targetDir = options.dir;
  if (!existsSync(targetDir)) {
    error(`Target directory does not exist: ${targetDir}`);
    process.exit(1);
  }

  // Default: local copy (global is auto-detected by OpenCode on macOS/Linux)
  return initLocal(options);
}
