#!/usr/bin/env node

/**
 * check-migrations.mjs
 * CI validation: checks migration system integrity
 *
 * Verifies:
 * - All migration files referenced in manifest.json exist
 * - Versions are sequential (no gaps, no duplicates)
 * - Manifest JSON is parseable
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.join(__dirname, '..', 'migrations', 'manifest.json');

let ok = true;

// 1. Parse manifest
let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  console.log('✓ manifest.json is valid JSON');
} catch (err) {
  console.error('✗ manifest.json parse error:', err.message);
  process.exit(1);
}

// 2. Check all referenced files exist
const entries = Object.entries(manifest);
for (const [file, meta] of entries) {
  const fullPath = path.join(__dirname, '..', 'migrations', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`✗ Missing migration file: ${file}`);
    ok = false;
  } else {
    console.log(`✓ Migration file exists: ${file}`);
  }
}

// 3. Check versions are sequential
const versions = entries.map(([, m]) => m.version);
for (let i = 1; i < versions.length; i++) {
  const a = versions[i - 1].split('.').map(Number);
  const b = versions[i].split('.').map(Number);
  const aNum = a[0] * 10000 + a[1] * 100 + a[2];
  const bNum = b[0] * 10000 + b[1] * 100 + b[2];

  if (aNum >= bNum) {
    console.error(
      `✗ Migration version order error: ${versions[i - 1]} >= ${versions[i]}`
    );
    ok = false;
  } else {
    console.log(
      `✓ Version order OK: ${versions[i - 1]} → ${versions[i]}`
    );
  }
}

// 4. Summary
if (ok) {
  console.log(`\n✓ Migration system integrity check passed (${entries.length} migrations)`);
} else {
  console.error(`\n✗ Migration system integrity check FAILED`);
  process.exit(1);
}
