const core = require('@actions/core');
const { GitHub, context } = require('@actions/github');

const run = async () => {
  // Get owner and repo from context of payload that triggered the action
  const { owner, repo } = context.repo;
  core.debug(`repository: ${owner}/${repo}`);

  if (
    context.payload === undefined
    || context.payload.check_suite === undefined
    || context.payload.check_suite.pull_requests === undefined
  ) {
    core.info('Skip merge: pull request information is unavailable.');
    return;
  }

  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  const github = new GitHub(GITHUB_TOKEN);

  for (const pullRequest of context.payload.check_suite.pull_requests) {
    // const pullRequestId = pullRequest.id;
    const pullRequestNumber = pullRequest.number;
    core.info(`pull request detected: ${pullRequestNumber}`);

    const pr = await github.pulls.get({
      owner,
      repo,
      pullRequestNumber,
    });

    console.log(JSON.stringify(pr, undefined, 2));
  }


  // const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
  // const octokit = new GitHub(GITHUB_TOKEN);

  /*
    // Dump event data first
    console.log(JSON.stringify(github.context, undefined, 2));

    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
    const octokit = new github.GitHub(GITHUB_TOKEN);


    if (github.context.payload.check_suite.pull_requests === undefined) {
      console.log('Skipping: pull request information is unavailable.');
      return;
    }

    for (const pullRequest of github.context.payload.check_suite.pull_requests) {
      // const pullRequestId = pullRequest.id;
      const pullRequestNumber = pullRequest.number;
      console.log(JSON.stringify(pullRequest, undefined, 2));

      const pr = await octokit.pulls.get({
        owner,
        repo,
        pullRequestNumber,
      });

      console.log(JSON.stringify(pr, undefined, 2));
    }
  */
};

module.exports = run;
