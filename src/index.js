const core = require('@actions/core');
const run = require('./merge');

run().catch((error) => {
  core.setFailed(`An unexpected error occurred: ${error}, ${error.stack}.`);
});
