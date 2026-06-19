/**
 * Migration 001: Initial Setup
 * Version: 1.2.11
 *
 * Establishes the migration system foundation:
 * - Ensures .kit-version file exists in target .opencode/
 * - Validates that opencode.json has the expected structure
 * - Sets up the pattern for future sequential migrations
 *
 * This is a no-op migration — it's a marker that the migration
 * system is active and ready. Future migrations will follow
 * the same pattern with "001_" prefix incremented.
 */

/**
 * @param {object} opts
 * @param {string} opts.targetDir - Target project directory
 * @param {object} opts.config - Parsed opencode.json config
 * @param {object} opts.fs - Node fs module
 * @param {object} opts.path - Node path module
 */
export default {
  version: '1.2.11',
  description:
    'Initialize migration system — establish .kit-version tracking and validate config structure',

  async up(opts) {
    const { config, fs, targetDir, path } = opts;
    const opencodeDir = path.join(targetDir, '.opencode');

    // Ensure .opencode directory exists
    if (!fs.existsSync(opencodeDir)) {
      fs.mkdirSync(opencodeDir, { recursive: true });
    }

    // Ensure .kit-version file exists
    const versionFile = path.join(opencodeDir, '.kit-version');
    if (!fs.existsSync(versionFile)) {
      fs.writeFileSync(versionFile, '1.2.11\n', 'utf-8');
    }

    // Validate config has agent and permission fields
    if (!config.agent || typeof config.agent !== 'object') {
      console.warn('  ⚠  Migration 001: opencode.json missing "agent" field');
    }
    if (!config.permission || typeof config.permission !== 'object') {
      console.warn('  ⚠  Migration 001: opencode.json missing "permission" field');
    }

    // Ensure gitignore covers .kit-version
    const gitignorePath = path.join(targetDir, '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, 'utf-8');
      if (!content.includes('.kit-version')) {
        fs.appendFileSync(
          gitignorePath,
          '\n# opencode-agent-kit migration tracking\n.opencode/.kit-version\n',
        );
      }
    }

    return { success: true };
  },

  async down(opts) {
    const { fs, targetDir, path } = opts;
    const versionFile = path.join(targetDir, '.opencode', '.kit-version');
    if (fs.existsSync(versionFile)) {
      fs.unlinkSync(versionFile);
    }
    return { success: true };
  },
};
