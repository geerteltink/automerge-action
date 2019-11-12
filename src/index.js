const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

const {
  GITHUB_TOKEN, GITHUB_ACTION, GITHUB_SHA, GITHUB_REF,
} = process.env;

async function run() {
  try {
    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const github = new GitHub(GITHUB_TOKEN);

    // Get owner and repo from context of payload that triggered the action
    const { owner, repo } = context.repo;

    console.log(`owner: ${owner}/${repo}, GITHUB_ACTION: ${GITHUB_ACTION}, GITHUB_SHA: ${GITHUB_SHA}, GITHUB_REF: ${GITHUB_REF}`);

    const suites = await github.checks.listSuitesForRef({
      owner,
      repo,
      GITHUB_SHA,
    });

    console.log(JSON.stringify(suites, undefined, 2));

    /*
    if ('check_suite' in context && 'pull_request' in context.check_suite) {

    }
    */
  } catch (error) {
    core.setFailed(error.message);
  }
}

if (require.main === module) {
  run();
}
