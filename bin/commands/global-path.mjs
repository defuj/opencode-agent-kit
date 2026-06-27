import { existsSync } from 'fs';
import { join } from 'path';
import { homedir, platform } from 'os';

/**
 * Get the OpenCode global configuration directory.
 *
 * This is where OpenCode reads its config from on each platform.
 * On macOS, OpenCode stores config at ~/.config/opencode/.
 * On Linux, follows XDG spec: $XDG_CONFIG_HOME/opencode/.
 * On Windows, follows %APPDATA%\opencode\.
 *
 * Resolution order:
 *   1. $OPENCODE_HOME env var (full override)
 *   2. Platform default
 *
 * @returns {string} Absolute path to the OpenCode global config directory
 */
export function getOpenCodeHome() {
  if (process.env.OPENCODE_HOME) {
    return process.env.OPENCODE_HOME;
  }

  if (platform() === 'win32') {
    // Windows: %USERPROFILE%\.config\opencode\ (NOT %APPDATA%)
    const userProfile = process.env.USERPROFILE || join(homedir(), 'AppData', 'Roaming');
    return join(userProfile, '.config', 'opencode');
  }

  // macOS / Linux: XDG Base Directory Specification
  const xdgConfig = process.env.XDG_CONFIG_HOME || join(homedir(), '.config');
  return join(xdgConfig, 'opencode');
}

/**
 * Check whether a global install of the agent kit exists.
 * Looks for the opencode.jsonc config file in the OpenCode home directory.
 *
 * @returns {boolean}
 */
export function globalInstallExists() {
  return existsSync(join(getOpenCodeHome(), 'opencode.jsonc'));
}
