import { existsSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_NAME = 'opencode-agent-kit';

// Migration manifest path
const MIGRATIONS_DIR = join(__dirname, '..', '..', 'bin', 'migrations');

/**
 * Compare two semver strings
 */
function compareVersions(a, b) {
  const va = a.replace(/^v/, '').split('.').map(Number);
  const vb = b.replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    const diff = (va[i] || 0) - (vb[i] || 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function check(condition, passMsg, failMsg) {
  if (condition) {
    console.log(`  ✓ ${passMsg}`);
    return true;
  }
  console.log(`  ✗ ${failMsg}`);
  return false;
}

function warn(msg) {
  console.log(`  ⚠ ${msg}`);
}

export async function doctor(options) {
  const targetDir = options.dir || process.cwd();
  const { fix } = options;

  console.log(`\n  ${PKG_NAME} doctor`);
  console.log(`  ${'─'.repeat(50)}`);
  console.log(`  Target: ${targetDir}\n`);

  let allGood = true;

  // 1. Check Node.js version
  const nodeVersion = process.version;
  const major = parseInt(nodeVersion.slice(1).split('.')[0], 10);
  allGood &= check(
    major >= 18,
    `Node.js ${nodeVersion} (>= 18)`,
    `Node.js ${nodeVersion} — need >= 18`,
  );

  // 2. Check package.json exists
  const pkgPath = join(targetDir, 'package.json');
  allGood &= check(existsSync(pkgPath), 'package.json found', 'package.json not found');

  // 3. Check opencode.json
  const configPath = join(targetDir, 'opencode.json');
  const hasConfig = existsSync(configPath);
  allGood &= check(hasConfig, 'opencode.json found', 'opencode.json not found');

  if (hasConfig) {
    try {
      JSON.parse(readFileSync(configPath, 'utf-8'));
      check(true, 'opencode.json is valid JSON', '');
    } catch {
      allGood = false;
      console.log('  ✗ opencode.json is not valid JSON');
    }
  }

  // 4. Check .opencode directory
  const opencodeDir = join(targetDir, '.opencode');
  const hasOpencode = existsSync(opencodeDir);
  allGood &= check(hasOpencode, '.opencode/ directory found', '.opencode/ directory not found');

  if (hasOpencode) {
    // 4a. Check agent prompts
    const agentsDir = join(opencodeDir, 'prompts', 'agents');
    check(
      existsSync(agentsDir),
      '.opencode/prompts/agents/ found',
      '.opencode/prompts/agents/ missing',
    );

    // 4b. Check instructions
    const instrDir = join(opencodeDir, 'instructions');
    check(existsSync(instrDir), '.opencode/instructions/ found', '.opencode/instructions/ missing');

    // 4c. Check skills
    const skillsDir = join(opencodeDir, 'skills');
    check(existsSync(skillsDir), '.opencode/skills/ found', '.opencode/skills/ missing');

    // 4d. Count agents
    if (existsSync(agentsDir)) {
      const agents = readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
      check(
        agents.length >= 10,
        `${agents.length} agent prompts found (expected 34)`,
        `Only ${agents.length} agent prompts found (expected 34)`,
      );
    }

    // 4e. Check kit-version
    const versionFile = join(opencodeDir, '.kit-version');
    if (existsSync(versionFile)) {
      const installedVersion = readFileSync(versionFile, 'utf-8').trim();
      try {
        const latest = execSync(`npm view ${PKG_NAME} version`, {
          encoding: 'utf-8',
          timeout: 5000,
        }).trim();
        if (installedVersion !== latest) {
          warn(`Kit v${installedVersion} installed, v${latest} available`);
          if (fix) {
            console.log('     → Run `npx opencode-agent-kit upgrade` to update');
            console.log(
              '     → Then run `npx opencode-agent-kit migrate` to apply config migrations',
            );
          }
        } else {
          check(true, `Kit version v${installedVersion} (up to date)`, '');
        }
      } catch {
        warn('Could not check latest version (npm registry unreachable)');
      }
    } else {
      warn('.kit-version not found');
    }

    // 4f. Check pending migrations
    const manifestPath = join(MIGRATIONS_DIR, 'manifest.json');
    if (existsSync(manifestPath) && existsSync(versionFile)) {
      try {
        const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
        const installedVersion = readFileSync(versionFile, 'utf-8').trim();
        const pkgPath = join(__dirname, '..', '..', 'package.json');
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
        const currentVersion = pkg.version;

        const pending = Object.entries(manifest).filter(([, meta]) => {
          return (
            compareVersions(meta.version, installedVersion) > 0 &&
            compareVersions(meta.version, currentVersion) <= 0
          );
        });

        if (pending.length > 0) {
          warn(
            `${pending.length} pending migration(s) (v${installedVersion} → v${currentVersion})`,
          );
          if (fix) {
            console.log('     → Run `npx opencode-agent-kit migrate` to apply');
          }
        } else {
          check(true, 'No pending migrations', '');
        }
      } catch {
        // Silently skip if migration check fails
      }
    }
  }

  // 5. Check .gitignore
  const gitignorePath = join(targetDir, '.gitignore');
  if (existsSync(gitignorePath)) {
    const content = readFileSync(gitignorePath, 'utf-8');
    check(
      content.includes('.opencode') || content.includes('opencode.json'),
      '.gitignore covers .opencode/ files',
      '.gitignore may not cover .opencode/ files',
    );
  } else {
    warn('.gitignore not found');
    if (fix) {
      console.log('     → Run `opencode-agent-kit init` to create one');
    }
  }

  // 6. Check global agentmemory
  try {
    execSync('agentmemory --version', { stdio: 'pipe', timeout: 3000 });
    check(true, 'agentmemory (global) is installed', '');
  } catch {
    warn('agentmemory not installed globally');
    if (fix) {
      console.log('     → Run: npm install -g @agentmemory/agentmemory');
    }
  }

  // Summary
  console.log(`\n  ${'─'.repeat(50)}`);
  if (allGood) {
    console.log(`\n  ✅ All checks passed. Your setup looks good!\n`);
  } else {
    console.log(`\n  ⚠  Some checks failed. Review the issues above.\n`);
    if (!fix) {
      console.log(`  Tip: Run with --fix to enable actionable suggestions.\n`);
    }
  }
}
