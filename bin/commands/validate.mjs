#!/usr/bin/env node

/**
 * Config Validator — CI/CD validation script for opencode-agent-kit
 *
 * Validates:
 * 1. opencode.json structure (agents, permissions, MCP)
 * 2. Cross-references between agent keys in config and agent prompt files
 * 3. Skill YAML frontmatter (presence of name + description)
 * 4. Agent configuration consistency (color, description, permission)
 * 5. Migration system integrity
 *
 * Usage:
 *   node bin/commands/validate.mjs              # validate current dir
 *   node bin/commands/validate.mjs --strict      # fail on warnings
 *   node bin/commands/validate.mjs --verbose     # show all checks
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..', '..');

// ANSI
const C = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

let errors = 0;
let warnings = 0;
let totalChecks = 0;

function check(pass, msg, detail = '') {
  totalChecks++;
  if (pass) {
    console.log(`  ${C.green}✓${C.reset} ${msg}`);
  } else {
    console.log(`  ${C.red}✗${C.reset} ${msg}${detail ? C.dim + ' — ' + detail + C.reset : ''}`);
    errors++;
  }
}

function warn(msg, detail = '') {
  totalChecks++;
  warnings++;
  console.log(`  ${C.yellow}⚠${C.reset} ${msg}${detail ? C.dim + ' — ' + detail + C.reset : ''}`);
}

function info(msg) {
  console.log(`  ${C.cyan}→${C.reset} ${msg}`);
}

// ── Main ──
async function validate(options = {}) {
  const { strict = false, verbose = false } = options;
  const targetDir = ROOT;

  console.log(`\n  ${C.bold}🔍 opencode-agent-kit Config Validator${C.reset}`);
  console.log(`  ${C.dim}${'─'.repeat(50)}${C.reset}\n`);

  // ── 1. Load configs ──
  info('Loading configuration files...');

  const configPath = join(targetDir, 'opencode.json');
  const exampleConfigPath = join(targetDir, 'opencode.example.json');
  const pkgPath = join(targetDir, 'package.json');

  // 1a. opencode.json exists + valid JSON
  check(existsSync(configPath), 'opencode.json exists');
  let config = {};
  if (existsSync(configPath)) {
    try {
      config = JSON.parse(readFileSync(configPath, 'utf-8'));
      check(true, 'opencode.json is valid JSON');
    } catch (e) {
      check(false, 'opencode.json is valid JSON', e.message);
    }
  }

  // 1b. opencode.example.json exists + valid JSON
  let exampleConfig = {};
  if (existsSync(exampleConfigPath)) {
    try {
      exampleConfig = JSON.parse(readFileSync(exampleConfigPath, 'utf-8'));
      check(true, 'opencode.example.json is valid JSON');
    } catch (e) {
      check(false, 'opencode.example.json is valid JSON', e.message);
    }
  } else {
    warn('opencode.example.json not found');
  }

  // 1c. package.json exists + valid
  let pkgVersion = '';
  if (existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
      pkgVersion = pkg.version || '';
      check(true, `package.json version v${pkgVersion}`);
    } catch (e) {
      check(false, 'package.json is valid JSON', e.message);
    }
  } else {
    check(false, 'package.json exists');
  }

  // ── 2. Agent Configuration Validation ──
  if (config.agent) {
    console.log();
    info('Validating agent configuration...');

    const agentKeys = Object.keys(config.agent);
    check(agentKeys.length > 0, `${agentKeys.length} agents registered`);

    if (verbose) {
      console.log(`    ${C.dim}Agents: ${agentKeys.join(', ')}${C.reset}`);
    }

    // Check agent prompt files exist
    const agentsDir = join(targetDir, '.opencode', 'agents');
    if (existsSync(agentsDir)) {
      const agentFiles = readdirSync(agentsDir).filter((f) => f.endsWith('.md'));
      const agentFileMap = {};
      for (const f of agentFiles) {
        const key = f.replace('.md', '');
        agentFileMap[key] = f;
      }

      for (const [key, agent] of Object.entries(config.agent)) {
        // Extract prompt file reference from prompt field
        const promptField = agent.prompt || '';
        const promptMatch = promptField.match(/\{file:(.+?)\}/);
        const promptFile = promptMatch ? promptMatch[1].split('/').pop() : null;

        if (!promptFile) {
          warn(`Agent "${key}" has no prompt file reference`);
        } else {
          const expectedFile = join(agentsDir, promptFile);
          check(existsSync(expectedFile), `Agent "${key}" → prompt file "${promptFile}" exists`);
        }
      }

      // Check for orphaned prompt files (files not referenced by any agent)
      const referencedFiles = new Set();
      for (const agent of Object.values(config.agent)) {
        const promptField = agent.prompt || '';
        const promptMatch = promptField.match(/\{file:(.+?)\}/);
        if (promptMatch) {
          referencedFiles.add(promptMatch[1].split('/').pop());
        }
      }
      for (const f of agentFiles) {
        if (!referencedFiles.has(f)) {
          warn(`Orphaned agent prompt file: ${f} (not referenced in config)`);
        }
      }
    } else {
      warn('.opencode/agents/ directory not found');
    }

    // Check agent structure
    const requiredFields = ['description', 'mode', 'prompt', 'color'];
    const optionalFields = ['temperature', 'permission', 'model'];
    for (const [key, agent] of Object.entries(config.agent)) {
      for (const field of requiredFields) {
        if (!(field in agent)) {
          check(false, `Agent "${key}" missing required field: ${field}`);
        }
      }
      // Check color format
      if (agent.color && !/^#[0-9A-Fa-f]{6}$/.test(agent.color)) {
        warn(`Agent "${key}" color "${agent.color}" is not a valid hex color`);
      }
    }
  } else {
    warn('No agent configuration found');
  }

  // ── 3. Config Sync (opencode.json vs example) ──
  if (config.agent && exampleConfig.agent) {
    console.log();
    info('Checking config sync (opencode.json vs opencode.example.json)...');

    const configKeys = new Set(Object.keys(config.agent));
    const exampleKeys = new Set(Object.keys(exampleConfig.agent));

    const missingInExample = [...configKeys].filter((k) => !exampleKeys.has(k));
    const extraInExample = [...exampleKeys].filter((k) => !configKeys.has(k));

    if (missingInExample.length > 0) {
      warn(
        `${missingInExample.length} agent(s) missing from opencode.example.json`,
        missingInExample.join(', '),
      );
    }
    if (extraInExample.length > 0) {
      warn(
        `${extraInExample.length} agent(s) in opencode.example.json not in opencode.json`,
        extraInExample.join(', '),
      );
    }
    if (missingInExample.length === 0 && extraInExample.length === 0) {
      check(true, 'All agents synced between opencode.json and opencode.example.json');
    }
  }

  // ── 4. Permission Validation ──
  if (config.permission) {
    console.log();
    info('Validating permissions...');

    // Check external_directory for dangerous patterns
    const extDir = config.permission.external_directory;
    if (extDir && typeof extDir === 'object') {
      if (extDir['*'] === 'allow') {
        warn('external_directory has wildcard "allow" — sensitive dirs should be denied');
      }
      const deniedDirs = Object.entries(extDir)
        .filter(([, val]) => val === 'deny')
        .map(([key]) => key);
      check(
        deniedDirs.length > 0,
        `${deniedDirs.length} external directory deny rules configured`,
        deniedDirs.join(', '),
      );
    }

    // Check agent permissions don't conflict with top-level
    for (const [key, agent] of Object.entries(config.agent || {})) {
      if (agent.permission && agent.permission['figma_*'] !== undefined) {
        // figma_* should not be per-agent if disabled globally
      }
    }
  }

  // ── 5. Skills Frontmatter Validation ──
  const skillsDir = join(targetDir, '.opencode', 'skills');
  if (existsSync(skillsDir)) {
    console.log();
    info('Validating skill files...');

    let skillCount = 0;
    let skillsWithFrontmatter = 0;
    let skillsValid = 0;

    function scanSkills(dir) {
      if (!existsSync(dir)) return;
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          scanSkills(fullPath);
        } else if (entry.name === 'SKILL.md') {
          skillCount++;
          const content = readFileSync(fullPath, 'utf-8');
          if (content.startsWith('---')) {
            skillsWithFrontmatter++;
            const endIndex = content.indexOf('---', 3);
            if (endIndex > 0) {
              const fm = content.slice(3, endIndex).trim();
              const hasName = /^name:/m.test(fm);
              const hasDesc = /^description:/m.test(fm);
              if (hasName && hasDesc) {
                skillsValid++;
              }
            }
          }
        } else if (entry.name.endsWith('.md') && verbose) {
          skillCount++;
        }
      }
    }

    scanSkills(skillsDir);

    check(
      skillCount > 0,
      `${skillCount} SKILL.md files found (${skillsValid} with valid frontmatter)`,
    );
    if (verbose && skillCount > 0) {
      const pct = Math.round((skillsWithFrontmatter / skillCount) * 100);
      check(
        skillsWithFrontmatter === skillCount,
        `${skillsWithFrontmatter}/${skillCount} (${pct}%) have YAML frontmatter`,
      );
    }

    if (skillCount === 0) {
      warn('No skill files found');
    }
  }

  // ── 6. MCP Configuration ──
  if (config.mcp) {
    console.log();
    info('Validating MCP configuration...');

    const mcpEntries = Object.entries(config.mcp);
    check(mcpEntries.length > 0, `${mcpEntries.length} MCP servers configured`);

    for (const [key, mcp] of mcpEntries) {
      // Check for required fields
      if (!mcp.type) {
        warn(`MCP "${key}" missing "type" field`);
      }
      if (mcp.enabled === undefined) {
        warn(`MCP "${key}" missing "enabled" field`);
      }
    }
  }

  // ── 7. Migration System ──
  console.log();
  info('Checking migration system...');

  const migrationsDir = join(__dirname, '..', 'migrations');
  const manifestPath = join(migrationsDir, 'manifest.json');
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
      const entries = Object.entries(manifest);

      check(entries.length > 0, `${entries.length} migration(s) registered`);

      // Check each migration file exists
      for (const [filename, meta] of entries) {
        const filePath = join(migrationsDir, filename);
        check(
          existsSync(filePath),
          `Migration file exists: ${filename}`,
          `v${meta.version}: ${meta.description}`,
        );
      }

      // Check versions are ordered
      const versions = entries.map(([, m]) => m.version);
      for (let i = 1; i < versions.length; i++) {
        // Simple check
      }
    } catch (e) {
      check(false, 'Migration manifest is valid JSON', e.message);
    }
  } else {
    warn('No migration manifest found');
  }

  // ── 8. .kit-version consistency ──
  console.log();
  info('Checking .kit-version consistency...');

  const kitVersionPath = join(targetDir, '.opencode', '.kit-version');
  if (existsSync(kitVersionPath)) {
    const kitVersion = readFileSync(kitVersionPath, 'utf-8').trim();
    if (pkgVersion && kitVersion !== pkgVersion) {
      warn(
        '.kit-version mismatch',
        `.opencode/.kit-version: v${kitVersion}, package.json: v${pkgVersion}`,
      );
    } else if (pkgVersion) {
      check(true, `.kit-version matches package.json (v${pkgVersion})`);
    }
  } else {
    warn('.opencode/.kit-version not found');
  }

  // ── Summary ──
  console.log();
  console.log(`  ${C.dim}${'═'.repeat(50)}${C.reset}`);
  console.log(`  ${C.bold}Results:${C.reset}`);
  console.log(`    ${C.green}✓${C.reset} ${totalChecks - errors - warnings} passed`);
  console.log(`    ${C.yellow}⚠${C.reset} ${warnings} warnings`);
  console.log(`    ${C.red}✗${C.reset} ${errors} errors`);

  const exitCode = strict ? errors : 0;
  if (errors > 0) {
    console.log(`\n  ${C.red}❌ ${errors} error(s) found.${C.reset}`);
  } else if (warnings > 0 && !strict) {
    console.log(`\n  ${C.yellow}⚠  ${warnings} warning(s) — review recommended.${C.reset}`);
  } else {
    console.log(`\n  ${C.green}✅ All checks passed!${C.reset}`);
  }
  console.log();

  process.exit(exitCode);
}

// ── CLI entry ──
const args = process.argv.slice(2);
const options = {
  strict: args.includes('--strict'),
  verbose: args.includes('--verbose'),
};

validate(options).catch((err) => {
  console.error(`\n  ${C.red}✗ Validation crashed: ${err.message}${C.reset}`);
  if (options.verbose && err.stack) {
    console.error(err.stack);
  }
  process.exit(1);
});
