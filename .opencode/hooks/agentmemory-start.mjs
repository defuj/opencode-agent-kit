#!/usr/bin/env node
import { spawn } from 'child_process';

const PORT = process.env.AGENTMEMORY_URL || 'http://localhost:3111';
const HEALTH = `${PORT}/agentmemory/livez`;

async function isRunning() {
  try {
    const res = await fetch(HEALTH, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

async function waitForServer(timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await isRunning()) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function main() {
  if (!(await isRunning())) {
    const proc = spawn('npx', ['@agentmemory/agentmemory'], {
      stdio: 'ignore',
      detached: true,
    });
    proc.unref();
    const ready = await waitForServer();
    if (!ready) {
      console.error(
        '[agentmemory] server did not start in time, MCP will use local fallback (7 tools)',
      );
    }
  }

  const mcp = spawn('npx', ['-y', '@agentmemory/mcp', ...process.argv.slice(2)], {
    stdio: ['inherit', 'inherit', 'inherit'],
  });

  const cleanup = () => {
    mcp.kill();
    process.exit();
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGHUP', cleanup);

  mcp.on('exit', (code) => process.exit(code ?? 0));
}

main();
