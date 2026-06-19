import { readFileSync, existsSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = join(__dirname, '..', '..');
const MIGRATIONS_DIR = join(PKG_ROOT, 'bin', 'migrations');
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

/**
 * Parse a semver string into comparable parts
 */
function parseVersion(v) {
  const parts = v.replace(/^v/, '').split('.').map(Number);
  return { major: parts[0] || 0, minor: parts[1] || 0, patch: parts[2] || 0 };
}

/**
 * Compare two semver strings. Returns -1 if a < b, 0 if equal, 1 if a > b.
 */
function compareVersions(a, b) {
  const va = parseVersion(a);
  const vb = parseVersion(b);
  if (va.major !== vb.major) return va.major - vb.major;
  if (va.minor !== vb.minor) return va.minor - vb.minor;
  return va.patch - vb.patch;
}

/**
 * Load the manifest of available migrations
 */
function loadManifest() {
  const manifestPath = join(MIGRATIONS_DIR, 'manifest.json');
  if (!existsSync(manifestPath)) {
    return {};
  }
  return JSON.parse(readFileSync(manifestPath, 'utf-8'));
}

/**
 * Get the installed version from target project's .kit-version
 */
function getInstalledVersion(targetDir) {
  const versionFile = join(targetDir, '.opencode', '.kit-version');
  if (!existsSync(versionFile)) {
    return null;
  }
  return readFileSync(versionFile, 'utf-8').trim();
}

/**
 * Get the current package version
 */
function getCurrentVersion() {
  const pkgPath = join(PKG_ROOT, 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  return pkg.version;
}

/**
 * Determine which migrations need to run to go from installedVersion to currentVersion
 */
function getPendingMigrations(manifest, installedVersion, currentVersion) {
  if (!installedVersion) {
    // No version file — run all migrations
    return Object.entries(manifest).sort(([, a], [, b]) => compareVersions(a.version, b.version));
  }

  if (compareVersions(installedVersion, currentVersion) >= 0) {
    return []; // Already up to date
  }

  return Object.entries(manifest)
    .filter(([, meta]) => {
      return (
        compareVersions(meta.version, installedVersion) > 0 &&
        compareVersions(meta.version, currentVersion) <= 0
      );
    })
    .sort(([, a], [, b]) => compareVersions(a.version, b.version));
}

/**
 * Run pending migrations
 */
export async function runMigrations(targetDir, config, options = {}) {
  const { verbose } = options;
  const manifest = loadManifest();
  const currentVersion = getCurrentVersion();
  const installedVersion = getInstalledVersion(targetDir);

  if (Object.keys(manifest).length === 0) {
    info('No migrations registered.');
    return { ran: 0, failed: 0 };
  }

  const pending = getPendingMigrations(manifest, installedVersion, currentVersion);

  if (pending.length === 0) {
    if (verbose) {
      const version = installedVersion || '<none>';
      info(`No pending migrations (installed: v${version}, current: v${currentVersion}).`);
    }
    return { ran: 0, failed: 0 };
  }

  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);
  info(
    `Found ${pending.length} pending migration(s) — v${installedVersion || '0.0.0'} → v${currentVersion}`,
  );
  console.log();

  let ran = 0;
  let failed = 0;

  for (const [filename, meta] of pending) {
    const migrationPath = join(MIGRATIONS_DIR, filename);
    if (!existsSync(migrationPath)) {
      warn(`Migration file not found: ${filename} (v${meta.version})`);
      failed++;
      continue;
    }

    try {
      info(`Applying: ${filename} — ${meta.description}`);

      const { default: migration } = await import(migrationPath);
      const result = await migration.up({
        targetDir,
        config,
        fs: await import('fs'),
        path: await import('path'),
        verbose,
      });

      if (result && result.success) {
        success(`Migration ${filename} applied (v${meta.version})`);
        ran++;
      } else {
        warn(`Migration ${filename} completed with warnings`);
        ran++;
      }
    } catch (err) {
      console.error(`  ${C.red}✗${C.reset} Migration ${filename} failed: ${err.message}`);
      if (verbose && err.stack) {
        console.error(`    ${C.dim}${err.stack.split('\n').slice(1).join('\n    ')}${C.reset}`);
      }
      failed++;
    }
  }

  // Update .kit-version
  if (ran > 0 && failed === 0) {
    const versionFile = join(targetDir, '.opencode', '.kit-version');
    writeFileSync(versionFile, currentVersion + '\n', 'utf-8');
    console.log();
    success(`Updated .kit-version to v${currentVersion}`);
  } else if (ran > 0 && failed > 0) {
    warn('Some migrations failed. .kit-version not updated.');
  }

  return { ran, failed };
}

/**
 * CLI handler for `migrate` command
 */
export async function migrate(options) {
  const targetDir = options.dir || process.cwd();
  const { verbose, dryRun, rollback } = options;

  console.log(`\n  ${C.bold}${PKG_NAME} migrate${C.reset}`);
  console.log(`  ${C.dim}Target: ${targetDir}${C.reset}`);
  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}`);

  const manifest = loadManifest();
  const currentVersion = getCurrentVersion();
  const installedVersion = getInstalledVersion(targetDir);

  console.log(`  Installed: ${C.cyan}v${installedVersion || '0.0.0 (none)'}${C.reset}`);
  console.log(`  Current:   ${C.cyan}v${currentVersion}${C.reset}`);
  console.log();

  if (Object.keys(manifest).length === 0) {
    info('No migrations registered.');
    return;
  }

  if (rollback) {
    warn('Rollback not yet implemented. Use --dry-run to see what would run.');
    return;
  }

  const pending = getPendingMigrations(manifest, installedVersion, currentVersion);

  if (pending.length === 0) {
    success('Already up to date. No pending migrations.');
    return;
  }

  console.log(`  ${C.bold}Pending migrations:${C.reset}`);
  for (const [filename, meta] of pending) {
    console.log(`    ${C.dim}${filename}${C.reset}`);
    console.log(`      → v${meta.version}: ${meta.description}`);
  }
  console.log();

  if (dryRun) {
    info(`Dry run — ${pending.length} migration(s) would be applied.`);
    info(`Run without --dry-run to apply.`);
    return;
  }

  // Load config
  const configPath = join(targetDir, 'opencode.json');
  let config = {};
  if (existsSync(configPath)) {
    try {
      config = JSON.parse(readFileSync(configPath, 'utf-8'));
    } catch (err) {
      console.error(`  ${C.red}✗${C.reset} Failed to parse opencode.json: ${err.message}`);
      process.exit(1);
    }
  } else {
    warn('opencode.json not found. Creating minimal config.');
  }

  const result = await runMigrations(targetDir, config, { verbose });

  if (result.failed > 0) {
    console.error(`\n  ${C.red}✗${C.reset} ${result.failed} migration(s) failed.`);
    process.exit(1);
  }

  console.log(`\n  ${C.bold}${C.green}✅ Migrations complete.${C.reset} (${result.ran} applied)\n`);
}
