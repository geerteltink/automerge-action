const core = require('@actions/core');
const run = require('./merge');

if (require.main === module) {
  run().catch((error) => {
    core.setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
  });
}
