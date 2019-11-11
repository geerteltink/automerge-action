const core = require('@actions/core');
const github = require('@actions/github');

try {
  // command: merge | rebase | release
  const command = core.getInput('command');
  console.log(`Executing '${command}' command`);

  const debug = core.getInput('debug') === 'true';
  if (debug) {
    console.log('Enabling debug mode');
  }

  const time = (new Date()).toTimeString();
  core.setOutput('time', time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  if (debug) {
    console.log(`The event payload: ${payload}`);
  }
} catch (error) {
  core.setFailed(error.message);
}
